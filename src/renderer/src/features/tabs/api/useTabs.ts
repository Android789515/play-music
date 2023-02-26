import { useRecoilState } from 'recoil';
import { tabsState } from '../stores';

import type { UUID } from 'types/stringTypes';
import type { Tab, TabKey } from '../types';
import { easyIterate } from 'utils/set';
import { testConditions } from 'utils/boolean';

import { libraryTab } from '../stores';

export const useTabs = () => {
   const [tabs, setTabs] = useRecoilState(tabsState);

   const easyTabsIterate = (callback: (tabs: Tab[]) => Tab[]) => {
      setTabs(prevTabs => {
         return easyIterate<Tab>(prevTabs, tabs => {
            return callback(tabs);
         });
      });
   };

   const getTabs = () => {
      return [...tabs];
   };

   const getTab = (tabID: UUID) => {
      return [...tabs].find(tab => tab.id === tabID);
   };

   const updateTab = (tabToUpdate: Tab, payload: { tabKey: TabKey, data: Tab[TabKey] }) => {
      return easyTabsIterate(tabs => {
         return tabs.map(tab => {
            const isTabToUpdate = tab.id === tabToUpdate.id;

            if (isTabToUpdate) {
               return { ...tab, [ payload.tabKey ]: payload.data };
            }

            return tab;
         });
      });
   };

   const clearCurrentTab = () => {
      return easyTabsIterate(tabs => {
         return tabs.map(tab => {
            return { ...tab, isCurrent: false };
         });
      });
   };
   const setCurrentTab = (tabToSet: Tab) => {
      clearCurrentTab();

      return easyTabsIterate(tabs => {
         return tabs.map(tab => {
            const isTabToUpdate = tab.id === tabToSet.id;

            if (isTabToUpdate) {
               return { ...tab, isCurrent: true };
            }

            return tab;
         });
      });
   };

   const openTab = (tabToOpen: Tab) => {
      return easyTabsIterate(tabs => {
         return tabs.map(tab => {
            const isTabToUpdate = tab.id === tabToOpen.id;

            if (isTabToUpdate) {
               return { ...tab, isOpen: true };
            }

            return tab;
         });
      });
   };

   const closeTab = (tabToClose: Tab) => {
      setCurrentTab(libraryTab);

      return easyTabsIterate(tabs => {
         return tabs.map(tab => {
            const isTabToUpdate = tab.id === tabToClose.id;

            if (isTabToUpdate) {
               return { ...tab, isOpen: false };
            }

            return tab;
         });
      });
   };

   const createTab = (tab: Tab) => {
      setTabs(prevTabs => new Set([ ...prevTabs, tab ]));

      openTab(tab);
   };

   const deleteTab = (tabToDelete: Tab) => {
      setCurrentTab(libraryTab);

      return easyTabsIterate(tabs => {
         return tabs.filter(tab => {
            return testConditions({
               isPermanent: () => tab.isPermanent || false,
               notTabToClose: () => tab.id !== tabToDelete.id
            }).any();
         });
      });
   };

   return {
      getTabs,
      getTab,
      setCurrentTab,
      openTab,
      closeTab,
      createTab,
      deleteTab,
      updateTab,
   };
};
