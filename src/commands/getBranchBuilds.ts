import {window, commands} from 'vscode';
import * as format from '../format';
import {getRepoName, getBranch, getUsername} from '../git';
import ci from '../circleci';
let _ = require('lodash');
import open from '../open-url';

function execute() {
  let buildsPromise = ci.getBranchBuilds()
    .then((builds) => {
      return builds.map(format.quickPickItemFromBuild);
    });
  
  return window.showQuickPick(buildsPromise, {
    placeHolder: 'Select a build to open it in a browser',
    matchOnDescription: true,
    matchOnDetail: true
  })
  // Success
  .then((item?: QuickPickItem) => {
    if (item && item.build.build_url) {
      open(item.build.build_url);
    }
  },
  // Error
  (error) => {
    let openUserSettings = 'Open user settings'
    window.showErrorMessage("There was an error connecting to CircleCI. Make sure your API key is valid.", openUserSettings)
      .then((action) => {
        if (action == openUserSettings) {
          commands.executeCommand('workbench.action.openGlobalSettings');
        }
      });
  });
}

export default execute;