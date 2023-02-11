import * as vscode from 'vscode';

const getDocumentWholeRange = (document: vscode.TextDocument) => {
  const start = document.positionAt(0);
  const end = document.positionAt(document.getText().length - 1);
  return new vscode.Range(start, end);
};

export const vscodeUtil = {
  getDocumentWholeRange,
};
