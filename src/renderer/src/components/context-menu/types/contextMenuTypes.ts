import type { MouseEventHandler } from 'react'

export interface Structure {
   [ contextMenuAction: string ]: MouseEventHandler;
}