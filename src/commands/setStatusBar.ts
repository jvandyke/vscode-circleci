import * as vscode from 'vscode';
let _ = require('lodash');
import ci from '../circleci';
import {getRepoName, getBranch, getUsername} from '../git';
import * as extContext from '../context';

let updateTimeout;
let rate = getRefreshRate();
let statusBarItem = undefined;
let statusSymbols = {
  canceled: 'circle-slash',
  running: 'sync',
  failed: 'alert',
  success: 'check',
  fixed: 'check',
  queued: 'clock',
  scheduled: 'clock',
};
let statusSentences = {
  canceled: 'was canceled',
  running: 'is currently running',
  failed: 'failed',
  success: 'was successful',
  fixed: 'was fixed',
  queued: 'is queued',
  scheduled: 'is scheduled',
};

vscode.workspace.onDidChangeConfiguration(() => {
  rate = getRefreshRate();
});

function getRefreshRate(): number {
  let circleCiConfig = vscode.workspace.getConfiguration('circleci');
  return <number>circleCiConfig.get('rate') || 10 * 1000;
}

function setStatusBarItem(build: CircleCIBuild): void {
  if (!statusBarItem) {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  }
  
  let status = build.status;
  let icon = statusSymbols[status];
  let tooltip = `Latest build for ${build.branch} (#${build.build_num}) ${statusSentences[status]}.`;

  statusBarItem.text = icon ? `CircleCI $(${icon})` : `CircleCI ${status}`;
  statusBarItem.tooltip = tooltip;
  statusBarItem.command = 'circleci.openUrl.fromBuild';
  statusBarItem.show();
}

export function startUpdate() {
  let buildsPromise = ci.getLatestBranchBuild()
    .then((build) => {
      extContext.setCurrentBuild(build);
      setStatusBarItem(build);
      updateTimeout = setTimeout(startUpdate, rate);
    });
}

export function stopUpdate() {
  if (updateTimeout) {
    clearTimeout(updateTimeout);
    updateTimeout = undefined;
  }
}