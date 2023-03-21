import { readdirSync, statSync } from 'fs';
import { join } from 'path';

import type { Path, Filename } from '../types/fileTypes';
import { isEmpty } from './array';

export const isDir = (path: Path) => {
   return statSync(path).isDirectory();
};

export const formatFileName = (fileName: string): FileName => {
   const fileExtension = '.';
   const [ name ] = fileName.split(fileExtension);

   return name;
};

const isSupportedAudioFile = (file: FileName) => {
   const supportedFormats = [
      '3gp',
      'aiff',
      'aif',
      'aifc',
      'aac',
      'ape',
      'asf',
      'bit',
      'bwf',
      'dff',
      'flac',
      'mp2',
      'mk3d',
      'mka',
      'mks',
      'mkv',
      'm4a',
      'm4b',
      'm4p',
      'm4r',
      'm4v',
      'mp+',
      'mp3',
      'mp4',
      'mpc',
      'mpp',
      'oga',
      'ogg',
      'ogm',
      'ogv',
      'ogx',
      'opus',
      'spx',
      'wav',
      'wave',
      'webm',
      'wma',
      'wmv',
      'wv',
      'wvc',
   ];

   const [ _, extension ] = file.split('.');

   return supportedFormats.includes(extension);
};

export interface PathDetails {
   name: string;
   path: Path;
   contents?: PathDetails[];
}

export const readContentsOfDir = (startPath: Path): PathDetails => {
   const paths = readdirSync(startPath);

   const contents = paths
      .reduce<PathDetails[]>((contents, path) => {
         const fullPath = join(startPath, path);

         if (isDir(fullPath)) {
            return [
               ...contents,
               {
                  name: path,
                  path: fullPath,
                  contents: readContentsOfDir(fullPath).contents,
               },
            ];
         } else if (isSupportedAudioFile(path)) {
            return [ ...contents, { name: path, path: fullPath } ];
         } else {
            // Unsupported file
            return contents;
         }
      }, [])
      .filter(path => (path.contents ? !isEmpty(path.contents) : true));

   return {
      name: startPath,
      path: startPath,
      contents,
   };
};
