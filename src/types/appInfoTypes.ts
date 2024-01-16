export type Version = string;

export interface AppInfo {
   versions: {
      node: Version;
      chrome: Version;
      electron: Version;
   },
}
