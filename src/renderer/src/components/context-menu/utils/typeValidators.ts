import type {
   ContextMenuItemWithMenu,
   ContextMenuItemWithEvent,
   OneOfAnyContextMenuItems,
} from '../types';

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
