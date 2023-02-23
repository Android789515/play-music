import { useRecoilState } from 'recoil';
import { tabsState } from '../stores';

import type { UUID } from 'types/stringTypes';
import type { Tab, TabKey } from '../types';
import { easyIterate, mapOverSet, filterSet } from 'utils/set';
import { testConditions } from 'utils/boolean';
import { updateInArray } from 'utils/array';
import { useLogValueChange } from 'hooks/useLogValueChange';

import { libraryTab } from '../stores';

export const useTabs = () => {
   const [tabs, setTabs] = useRecoilState(tabsState);

   const getTabs = () => {
      return [...tabs];
   };

   const updateTab = (tabID: UUID, payload: { tabKey: TabKey, data: Tab[TabKey] }) => {
      setTabs(prevTabs => {
         return easyIterate<Tab>(prevTabs, tabs => {
            return tabs.map(tab => {
               const isTabToUpdate = tab.id === tabID;
               if (isTabToUpdate) {
                  return { ...tab, [payload.tabKey]: payload.data };
               }

               return tab;
            });
         });
      });
   };

   const clearCurrentTab = () => {
      setTabs(prevTabs => {
         return mapOverSet(prevTabs, (tab: Tab) => {
            return { ...tab, isCurrent: false };
         });
      });
   };
   const setCurrentTab = (tabToSet: Tab) => {
      clearCurrentTab();

      setTabs(prevTabs => {
         return mapOverSet(prevTabs, (tab: Tab) => {
            const isTabToSet = tab.id === tabToSet.id;
            if (isTabToSet) {
               return { ...tab, isCurrent: true };
            }

            return tab;
         });
      });
   };

   const openTab = (tab: Tab) => {
      setTabs(prevTabs => {
         return easyIterate<Tab>(prevTabs, tabs => {
            return updateInArray(tabs, { ...tab, isOpen: true });
         });
      });
   };

   const closeTab = (tab: Tab) => {
      setTabs(prevTabs => {
         return easyIterate<Tab>(prevTabs, tabs => {
            return updateInArray(tabs, { ...tab, isOpen: false });
         });
      });

      setCurrentTab(libraryTab);
   };

   const createTab = (tab: Tab) => {
      setTabs(prevTabs => new Set([ ...prevTabs, tab ]));

      openTab(tab);
      setCurrentTab(tab);
   };

   const deleteTab = (tabToClose: Tab) => {
      setTabs(prevTabs => {
         return filterSet(prevTabs, (tab: Tab) => {
            // Tabs to keep
            return testConditions({
               isPermanent: () => tab.isPermanent || false,
               notTabToClose: () => tab.id !== tabToClose.id
            }).any();
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
