import {window, workspace} from 'vscode';
import {getRepoName, getBranch, getUsername} from './git';
let CircleCiApi = require('circleci');
let _ = require('lodash');

let apiKey = getApiKey();

workspace.onDidChangeConfiguration(() => {
  apiKey = getApiKey();
});

function getApiKey(): string {
  let circleCiConfig = workspace.getConfiguration('circleci');
  return <string>circleCiConfig.get('apiKey');
}

function _getInstance(apiKey: string) {
  if (!apiKey) {
    window.showErrorMessage("No CircleCI API key available. Set \"circleci.apiKey\" to fix this.", 'Open config');
  }
  return new CircleCiApi({
    auth: apiKey
  });
}

let getInstance = _.memoize(function() {
  return _getInstance(apiKey);
}, function() {
  // Make sure a new instance is returned when
  // the API key has changed
  return apiKey;
});

export default new class CircleCI {
  constructor() {}
  public getBranchBuilds(limit?: number, offset?: number) {
    return getInstance().getBranchBuilds({
      username: getUsername(),
      project: getRepoName(),
      branch: getBranch(),
      limit: limit || 30,
      offset: offset || 0,
    });
  }

  public getLatestBranchBuild() {
    return this.getBranchBuilds(1)
      .then((builds) => {
        return _.first(builds);
      });
  }
}
