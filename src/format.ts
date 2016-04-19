import * as moment from 'moment';
// import * as _ from 'lodash';
import * as vscode from 'vscode';
var _ = require('lodash');

// These should match the keys exposed in the APi response for
// status on a build.
let statusFormatters = {
  success: buildDetailsForSuccess,
  failure: buildDetailsForFailure,
  
};

export function timeAgo(date: string) {
  return moment(date).fromNow();
}

export function timeElapsed(startTime: string, stopTime: string) {
  return moment(startTime).diff(moment(stopTime), 'mins');
}

export function buildLabel(build) {
  return [
    "#" + build.build_num,
    build.subject
  ].join(' - ');
}

export function buildDescription(build:Object) {
  return "";
}

export function buildDetails(build) {
  return (statusFormatters[build.status] || buildDetailsForGeneric)(build); 
}

export function buildDetailsForGeneric(build) {
  return [
    _.startCase(build.status),
  ].join(' ');
}

export function buildDetailsForRunning(build) {
  return [
    _.startCase(build.status),
    '-',
    'started',
    timeAgo(build.start_time),
    'by',
    build.committer_email
  ].join(' ');
}

export function buildDetailsForSuccess(build) {
  return [
    _.startCase(build.status),
    '-',
    timeAgo(build.stop_time),
    'by',
    build.committer_email
  ].join(' ');
}

export function buildDetailsForFailure(build) {
  return [
    _.startCase(build.status),
    '-',
    timeAgo(build.stop_time),
    'by',
    build.committer_email
  ].join(' ');
}

export function quickPickItemFromBuild(build): vscode.QuickPickItem {
  return {
    label: buildLabel(build),
    description: '',
    detail: buildDetails(build)
  };
}