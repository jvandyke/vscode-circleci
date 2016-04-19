import {window, commands} from 'vscode';
import * as format from '../format';
import git from '../gitconfig';
import ci from '../circleci';
import * as _ from 'lodash';

function execute() {
  commands.getCommands().then((commandIds) => {
    console.log("all commands", commandIds);
  });
  
  
  commands.executeCommand('editor.action.openLink', 'http://theverge.com');
  
  
  let buildsPromise = ci().getBranchBuilds({
    username: git.username,
    project: git.repo,
    branch: git.branch,
  }).then((builds) => {
    console.log(builds[0]);
    return builds.map(format.quickPickItemFromBuild);
  });
  
  return window.showQuickPick(buildsPromise, {
    placeHolder: 'Select a build to open it in a browser',
    matchOnDescription: true,
    matchOnDetail: true
  })
  .then(() => {}, (error) => {
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