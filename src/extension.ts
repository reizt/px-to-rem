import * as vscode from 'vscode';
import { isAnySelected, replaceEditorRange } from './editor';

export function activate(context: vscode.ExtensionContext) {
  const convert = vscode.commands.registerCommand('px-to-rem.convert', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor == null) return;

    if (isAnySelected(editor)) {
      for (const s of editor.selections) {
        if (s.start.line === s.end.line && s.start.character === s.end.character) continue;
        const range = new vscode.Range(s.start, s.end);
        replaceEditorRange(editor, range);
      }
    } else {
      // when range is not defined, assign whole the range of the page.
      const start = editor.document.positionAt(0);
      const end = editor.document.positionAt(editor.document.getText().length - 1);
      const wholeRange = new vscode.Range(start, end);
      replaceEditorRange(editor, wholeRange);
    }
  });

  context.subscriptions.push(convert);
}

// This method is called when your extension is deactivated
export function deactivate() {}
