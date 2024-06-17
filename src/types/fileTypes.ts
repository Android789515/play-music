export type Path = string;

export type FileName = string;

export type FileExtension = `.${string}`;

export enum ImportBehaviour {
   move = 'move',
   copy = 'copy',
}
