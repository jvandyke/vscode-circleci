import * as moment from 'moment';
let _ = require('lodash');
import * as vscode from 'vscode';
import * as ci from './circleci';

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

export function buildLabel(build: CircleCIBuild) {
  return [
    "#" + build.build_num,
    build.subject
  ].join(' - ');
}

export function buildDescription(build:Object) {
  return "";
}

export function buildDetails(build: CircleCIBuild) {
  return (statusFormatters[build.status] || buildDetailsForGeneric)(build); 
}

export function buildDetailsForGeneric(build: CircleCIBuild) {
  return [
    _.startCase(build.status),
  ].join(' ');
}

export function buildDetailsForRunning(build: CircleCIBuild) {
  return [
    _.startCase(build.status),
    '-',
    'started',
    timeAgo(build.start_time),
    'by',
    build.committer_email
  ].join(' ');
}

export function buildDetailsForSuccess(build: CircleCIBuild) {
  return [
    _.startCase(build.status),
    '-',
    timeAgo(build.stop_time),
    'by',
    build.committer_email
  ].join(' ');
}

export function buildDetailsForFailure(build: CircleCIBuild) {
  return [
    _.startCase(build.status),
    '-',
    timeAgo(build.stop_time),
    'by',
    build.committer_email
  ].join(' ');
}

export function quickPickItemFromBuild(build: CircleCIBuild): QuickPickItem {
  return {
    label: buildLabel(build),
    description: '',
    detail: buildDetails(build),
    build: build
  };
}