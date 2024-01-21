export type Version = string;

export interface VersionInfo {
   name: string;
   version: Version;
}

export interface AppInfo {
   versions: VersionInfo[],
}
