import * as vscode from 'vscode';
import { pxToRem } from './core';
import { isAnySelected, replaceEditorRange } from './editor';
import { vscodeUtil } from './util';

const DEFAULT_PX_PER_REM = 10;

export function activate(context: vscode.ExtensionContext) {
  const converter = vscode.commands.registerCommand('px-to-rem.convert', async () => {
    const editor = vscode.window.activeTextEditor;

    if (editor == null) return;

    const setting = vscode.workspace.getConfiguration('px-to-rem');
    const pxPerRem = setting.get<number>('pxPerRem') ?? DEFAULT_PX_PER_REM;

    const ranges: vscode.Range[] = [];
    if (isAnySelected(editor)) {
      for (const s of editor.selections) {
        if (s.start.line === s.end.line && s.start.character === s.end.character) continue;
        const range = new vscode.Range(s.start, s.end);
        ranges.push(range);
      }
    } else {
      // when range is not defined, assign whole the range of the page.
      const wholeRange = vscodeUtil.getDocumentWholeRange(editor.document);
      ranges.push(wholeRange);
    }

    await Promise.all(ranges.map((range) => replaceEditorRange(editor, range, pxPerRem)));
  });

  const formatter = vscode.workspace.onDidSaveTextDocument(async (document) => {
    const setting = vscode.workspace.getConfiguration('px-to-rem');
    const pxPerRem = setting.get<number>('pxPerRem') ?? DEFAULT_PX_PER_REM;
    const runOnSave = setting.get<boolean>('runOnSave') ?? false;
    if (!runOnSave) return;

    const wholeRange = vscodeUtil.getDocumentWholeRange(document);
    const source = document.getText(wholeRange);
    const replaced = pxToRem(source, pxPerRem);
    if (source !== replaced) {
      const edit = new vscode.WorkspaceEdit();
      edit.replace(document.uri, wholeRange, replaced);
      await vscode.workspace.applyEdit(edit);
      await document.save();
    }
  });

  context.subscriptions.push(converter, formatter);
}

// This method is called when your extension is deactivated
export function deactivate() {}
