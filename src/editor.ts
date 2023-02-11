import * as vscode from 'vscode';
import { pxToRem } from './core';

export const replaceEditorRange = async (editor: vscode.TextEditor, range: vscode.Range, pxPerRem: number) => {
  const edit = new vscode.WorkspaceEdit();
  const source = editor.document.getText(range);
  const replaced = pxToRem(source, pxPerRem);
  edit.replace(editor.document.uri, range, replaced);
  await vscode.workspace.applyEdit(edit);
};

export const isAnySelected = (editor: vscode.TextEditor): boolean => {
  if (editor.selections.length === 0) return false;
  return !editor.selections.every((s) => s.start.line === s.end.line && s.start.character === s.end.character);
};
