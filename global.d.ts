
/**
 * Build information returned from CircleCI.
 */
interface CircleCIBuild {
  branch: string,
  build_num: number,
  build_url: string,
  committer_email: string,
  start_time: string,
  status: string,
  stop_time: string,
  subject: string,
}

/**
 * Item to be used in the QuickPicker. However, this is updated
 * for this extension to include some special properties to make
 * accessing them easier.
 */
interface QuickPickItem {
  /**
   * The build associated with this QuickPickItem
   */
  build: CircleCIBuild,
  [key: string]: any
}
