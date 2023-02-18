import { useRecoilState } from 'recoil';
import { tabsState } from '../stores';

import type { Tab } from '../types';
import { mapOverSet, filterSet } from 'utils/set';
import { testConditions } from 'utils/boolean';

export const useTabs = () => {
   const [tabs, setTabs] = useRecoilState(tabsState);

   const getTabs = () => {
      return [...tabs];
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
      setTabs(prevTabs => new Set([...prevTabs, tab]));
   };

   const closeTab = (tabToClose: Tab) => {
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
   };
};
