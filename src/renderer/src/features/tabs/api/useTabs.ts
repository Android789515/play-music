import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import type { UUID } from '@globalTypes/stringTypes';
import type { Tab, TabKey, TabData } from '../types';
import { saveData } from 'features/save-data';
import { tabsState } from '../stores';
import { testConditions } from '@utils/boolean';

interface TabSlice {
   key: TabKey;
   data: TabData | ((data: TabData) => boolean);
}

export const useTabs = () => {
   const [ tabs, setTabs ] = useRecoilState(tabsState);

   useEffect(() => {
      saveData(tabsState.key, JSON.stringify(tabs));
   }, [ tabs ]);

   const getTabs = useCallback(() => {
      return tabs;
   }, [ tabs ]);

   const getTab = useCallback((tabID: UUID) => {
      return tabs.find(tab => tab.id === tabID);
   }, [ tabs ]);
   
   const getCurrentTab = useCallback(() => {
      return tabs.find(tab => tab.isCurrent);
   }, [ tabs ]);

   const updateTab = useCallback((tabToUpdateID: UUID, payload: TabSlice) => {
      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToUpdateID;

            if (isTabToUpdate) {
               return { ...tab, [ payload.key ]: payload.data };
            }

            return tab;
         });
      });
   }, [ setTabs ]);

   const clearCurrentTab = useCallback(() => {
      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            return { ...tab, isCurrent: false };
         });
      });
   }, [ setTabs ]);

   const setCurrentTab = useCallback((tabToSet: Tab) => {
      clearCurrentTab();

      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToSet.id;

            if (isTabToUpdate) {
               return { ...tab, isCurrent: true };
            }

            return tab;
         });
      });
   }, [ setTabs, clearCurrentTab ]);

   const openTab = useCallback((tabToOpen: Tab) => {
      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToOpen.id;

            if (isTabToUpdate) {
               return { ...tab, isOpen: true };
            }

            return tab;
         });
      });
   }, [ setTabs ]);

   const closeTab = useCallback((tabToClose: Tab) => {
      setCurrentTab(libraryTab);

      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToClose.id;

            if (isTabToUpdate) {
               return { ...tab, isOpen: false };
            }

            return tab;
         });
      });
   }, [ setTabs, setCurrentTab ]);

   const createTab = useCallback((tab: Tab) => {
      setTabs(prevTabs => [ ...prevTabs, tab ]);

      openTab(tab);
   }, [ setTabs, openTab ]);

   const deleteTab = useCallback((tabToDelete: Tab) => {
      setCurrentTab(libraryTab);

      setTabs(prevTabs => {
         return prevTabs.filter(tab => {
            return testConditions({
               isPermanent: () => tab.isPermanent || false,
               notTabToClose: () => tab.id !== tabToDelete.id
            }).any();
         });
      });
   }, [ setTabs, setCurrentTab ]);

   return {
      getTabs,
      getTab,
      getCurrentTab,
      setCurrentTab,
      openTab,
      closeTab,
      createTab,
      deleteTab,
      updateTab,
   };
};
