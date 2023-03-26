import type { MouseEventHandler } from 'react';

export type ContextMenuLocation = { x: number, y: number } | null;

interface ContextMenuItem {
   name: string;
}

export interface ContextMenuItemWithMenu extends ContextMenuItem {
   menu: ContextMenuItem[];
}

export interface ContextMenuItemWithEvent extends ContextMenuItem {
   action: MouseEventHandler;
}

export type OneOfAnyContextMenuItems = (
   ContextMenuItem
   | ContextMenuItemWithMenu
   | ContextMenuItemWithEvent
);

export type ContextMenuStructure = OneOfAnyContextMenuItems[];
