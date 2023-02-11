import * as vscode from 'vscode';
import { isAnySelected, replaceEditorRange } from './editor';

const DEFAULT_PX_PER_REM = 10;

export function activate(context: vscode.ExtensionContext) {
  const convert = vscode.commands.registerCommand('px-to-rem.convert', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor == null) return;

    const setting = vscode.workspace.getConfiguration('px-to-rem');
    const pxPerRem = setting.get<number>('px-per-rem') ?? DEFAULT_PX_PER_REM;

    if (isAnySelected(editor)) {
      for (const s of editor.selections) {
        if (s.start.line === s.end.line && s.start.character === s.end.character) continue;
        const range = new vscode.Range(s.start, s.end);
        replaceEditorRange(editor, range, pxPerRem);
      }
    } else {
      // when range is not defined, assign whole the range of the page.
      const start = editor.document.positionAt(0);
      const end = editor.document.positionAt(editor.document.getText().length - 1);
      const wholeRange = new vscode.Range(start, end);
      replaceEditorRange(editor, wholeRange, pxPerRem);
    }
  });

  context.subscriptions.push(convert);
}

// This method is called when your extension is deactivated
export function deactivate() {}
