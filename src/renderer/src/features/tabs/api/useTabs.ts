import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import type { UUID } from '@globalTypes/stringTypes';
import type { Tab, TabKey } from '../types';
import { tabsState } from '../stores';
import { testConditions } from '@utils/boolean';

import { libraryTab } from '../stores';

export const useTabs = () => {
   const [ tabs, setTabs ] = useRecoilState(tabsState);

   const getTabs = useCallback(() => {
      return tabs;
   }, [ tabs ]);

   const getTab = useCallback((tabID: UUID) => {
      return tabs.find(tab => tab.id === tabID);
   }, [ tabs ]);
   
   const getCurrentTab = useCallback(() => {
      return tabs.find(tab => tab.isCurrent);
   }, [ tabs ]);

   const updateTab = useCallback((tabToUpdateID: UUID, payload: { tabKey: TabKey, data: Tab[ TabKey ] }) => {
      return setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToUpdateID;

            if (isTabToUpdate) {
               return { ...tab, [ payload.tabKey ]: payload.data };
            }

            return tab;
         });
      });
   }, [ setTabs ]);

   const clearCurrentTab = useCallback(() => {
      return setTabs(prevTabs => {
         return prevTabs.map(tab => {
            return { ...tab, isCurrent: false };
         });
      });
   }, [ setTabs ]);

   const setCurrentTab = useCallback((tabToSet: Tab) => {
      clearCurrentTab();

      return setTabs(prevTabs => {
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
      return setTabs(prevTabs => {
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

      return setTabs(prevTabs => {
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

      return setTabs(prevTabs => {
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
