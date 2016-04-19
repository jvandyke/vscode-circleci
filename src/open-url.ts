import * as vscode from 'vscode';
let open = require('open');

export default function openUrl(url) {
  try {
    open(url);
  }
  catch (error) {
    vscode.window.showErrorMessage('Couldn\'t open URL. ' + url);
    console.error(error.stack);
  }
}