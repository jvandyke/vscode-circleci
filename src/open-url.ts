import * as vscode from 'vscode';
import * as extContext from './context';
let open = require('open');

function openUrlFromBuild(build: CircleCIBuild) {
  openUrl(build.build_url);
}

function openUrlFromCurrentBuild() {
  openUrlFromBuild(extContext.getCurrentBuild())
}

export function registerCommands() {
  vscode.commands.registerCommand('circleci.openUrl.fromBuild', openUrlFromCurrentBuild);
}

export default function openUrl(url: string) {
  try {
    open(url);
  }
  catch (error) {
    vscode.window.showErrorMessage('Couldn\'t open URL. ' + url);
    console.error(error.stack);
  }
}