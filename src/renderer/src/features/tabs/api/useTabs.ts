import { useRecoilState } from 'recoil';
import { tabsState } from '../stores';

import type { Tab, TabKey } from '../types';
import { easyIterate } from 'utils/set';
import { testConditions } from 'utils/boolean';
import { updateInArray } from 'utils/array';
import { useLogValueChange } from 'hooks/useLogValueChange';

import { libraryTab } from '../stores';

export const useTabs = () => {
   const [tabs, setTabs] = useRecoilState(tabsState);

   useLogValueChange(tabs.size, { message: 'Tabs Changed!' });

   const getTabs = () => {
      return [...tabs];
   };

   const easyTabsIterate = (callback: (tabs: Tab[]) => Tab[]) => {
      setTabs(prevTabs => {
         return easyIterate<Tab>(prevTabs, tabs => {
            return callback(tabs);
         });
      });
   };

   const updateTab = (tab: Tab, payload: { tabKey: TabKey, data: Tab[TabKey] }) => {
      return easyTabsIterate(tabs => {
         return updateInArray(tabs, { ...tab, [payload.tabKey]: payload.data })
      });
   };

   const clearCurrentTab = () => {
      return easyTabsIterate(tabs => {
         return tabs.map(tab => {
            return { ...tab, isCurrent: false };
         });
      });
   };
   const setCurrentTab = (tab: Tab) => {
      clearCurrentTab();

      return easyTabsIterate(tabs => {
         return updateInArray(tabs, { ...tab, isCurrent: true });
      });
   };

   const openTab = (tab: Tab) => {
      return easyTabsIterate(tabs => {
         return updateInArray(tabs, { ...tab, isOpen: true });
      });
   };

   const closeTab = (tab: Tab) => {
      setCurrentTab(libraryTab);

      return easyTabsIterate(tabs => {
         return updateInArray(tabs, { ...tab, isOpen: false });
      });
   };

   const createTab = (tab: Tab) => {
      setTabs(prevTabs => new Set([ ...prevTabs, tab ]));

      openTab(tab);
      setCurrentTab(tab);
   };

   const deleteTab = (tabToClose: Tab) => {
      return easyTabsIterate(tabs => {
         return tabs.filter(tab => {
            return testConditions({
               isPermanent: () => tab.isPermanent || false,
               notTabToClose: () => tab.id !== tabToClose.id
            }).any;
         });
      });
   };

   return {
      getTabs,
      setCurrentTab,
      openTab,
      closeTab,
      createTab,
      deleteTab,
      updateTab,
   };
};
