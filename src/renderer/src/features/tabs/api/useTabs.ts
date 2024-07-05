import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import type { UUID } from '@globalTypes/stringTypes';
import type { Tab, TabKey, TabData } from '../types';
import { tabsState, libraryTrackMark } from '../stores';
import { testConditions } from '@utils/boolean';

interface TabSlice {
   key: TabKey;
   data: TabData | ((data: TabData) => boolean);
}

export const useTabs = () => {
   const [ tabs, setTabs ] = useRecoilState(tabsState);

   const refreshLibrary = async () => {
      const songs = await window.api.getSongs();

      setTabs(_ => {
         const refreshedTabs = tabs.map(tab => {
            const isLibraryTab = tab.id.includes(libraryTrackMark);

            if (isLibraryTab) {
               return {
                  ...tab,
                  collection: songs,
               };
            } else {
               return tab;
            }
         });

         return refreshedTabs;
      });
   };

   useEffect(() => {
      window.api.saveData(tabsState.key, JSON.stringify(tabs));
   }, [ tabs ]);

   const getTabs = useCallback(() => {
      return tabs;
   }, [ tabs ]);

   const getTab = useCallback(({ key: keyToMatch, data: predicate }: TabSlice) => {
      return tabs.find(tab => {
         const isFunctionPredicate = typeof predicate === 'function';

         const tabSlice = tab[keyToMatch];

         return ( isFunctionPredicate
            ? predicate(tabSlice)
            : tabSlice === predicate
         );
      });
   }, [ tabs ]);

   const getLibraryTab = useCallback(() => {
      return tabs.find(tab => {
         return tab.id.includes(libraryTrackMark);
      })!;
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

   const setCurrentTab = useCallback((tabToSetID: UUID) => {
      clearCurrentTab();

      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToSetID;

            if (isTabToUpdate) {
               return { ...tab, isCurrent: true };
            }

            return tab;
         });
      });

   }, [ clearCurrentTab, setTabs ]);

   const openTab = useCallback((tabToOpenID: UUID) => {
      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToOpenID;

            if (isTabToUpdate) {
               return { ...tab, isOpen: true };
            }

            return tab;
         });
      });

      setCurrentTab(tabToOpenID);
   }, [ setTabs, setCurrentTab ]);

   const switchToNextOpenTab = useCallback((tabLeftID: UUID) => {
      const previousTabIndex = tabs.filter(tab => tab.isOpen)
         .map(tab => tab.id)
         .indexOf(tabLeftID) - 1;

      const previousTab = tabs[previousTabIndex];

      setCurrentTab(
         previousTab
            ? previousTab.id
            : getLibraryTab().id
      );
   }, [ tabs, setCurrentTab, getLibraryTab ]);

   const leaveTab = useCallback((tabLeftID: UUID) => {
      const didLeaveCurrentTab = getCurrentTab()?.id === tabLeftID;

      if (didLeaveCurrentTab) {
         switchToNextOpenTab(tabLeftID);
      }
   }, [ getCurrentTab, switchToNextOpenTab ]);

   const closeTab = useCallback((tabToClose: Tab) => {
      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToClose.id;

            if (isTabToUpdate) {
               return { ...tab, isOpen: false };
            }

            return tab;
         });
      });

      leaveTab(tabToClose.id);
   }, [ setTabs, leaveTab ]);

   const createTab = useCallback((tab: Tab) => {
      setTabs(prevTabs => [ ...prevTabs, tab ]);

      openTab(tab.id);
   }, [ setTabs, openTab ]);

   const deleteTab = useCallback((tabToDelete: Tab) => {
      setTabs(prevTabs => {
         return prevTabs.filter(tab => {
            return testConditions({
               isPermanent: () => tab.isPermanent || false,
               notTabToClose: () => tab.id !== tabToDelete.id
            }).any();
         });
      });

      leaveTab(tabToDelete.id);
   }, [ setTabs, leaveTab ]);

   return {
      refreshLibrary,
      getTabs,
      setTabs,
      getTab,
      getLibraryTab,
      getCurrentTab,
      setCurrentTab,
      openTab,
      closeTab,
      createTab,
      deleteTab,
      updateTab,
   };
};
