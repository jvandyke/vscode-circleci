import {window, workspace} from 'vscode';
let CircleCI = require('circleci');
import * as _ from 'lodash';

let apiKey = getApiKey();

workspace.onDidChangeConfiguration(() => {
  apiKey = getApiKey();
});

function getApiKey(): string {
  let circleCiConfig = workspace.getConfiguration('circleci');
  return <string>circleCiConfig.get('apiKey');
}

function _getInstance(apiKey) {
  if (!apiKey) {
    window.showErrorMessage("No CircleCI API key available. Set \"circleci.apiKey\" to fix this.", 'Open config');
  }
  return new CircleCI({
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

export default getInstance;
