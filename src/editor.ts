import type * as vscode from 'vscode';
import { pxToRem } from './core';

export const replaceEditorRange = (editor: vscode.TextEditor, range: vscode.Range) => {
  editor.edit((builder) => {
    const source = editor.document.getText(range);
    const replaced = pxToRem(source);
    builder.replace(range, replaced);
  });
};

export const isAnySelected = (editor: vscode.TextEditor): boolean => {
  if (editor.selections.length === 0) return false;
  return !editor.selections.every((s) => s.start.line === s.end.line && s.start.character === s.end.character);
};
