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
   isMainAction?: boolean;
}

export type OneOfAnyContextMenuItems = (
   ContextMenuItem
   | ContextMenuItemWithMenu
   | ContextMenuItemWithEvent
);

export type ContextMenuStructure = OneOfAnyContextMenuItems[];

export const isContextMenuItemWithMenu = (
   menuItem: OneOfAnyContextMenuItems
): menuItem is ContextMenuItemWithMenu => {
   return (menuItem as ContextMenuItemWithMenu).menu !== undefined;
};

export const isContextMenuItemWithEvent = (
   menuItem: OneOfAnyContextMenuItems
): menuItem is ContextMenuItemWithEvent => {
   return (menuItem as ContextMenuItemWithEvent).action !== undefined;
};
