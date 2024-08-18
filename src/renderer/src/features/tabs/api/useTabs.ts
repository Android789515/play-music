import { useEffect } from 'react';
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

   const getTabs = () => {
      return tabs;
   };

   const getTab = (tabID: UUID) => {
      return tabs.find(tab => {
         return tab.id === tabID;
      });
   };

   const getLibraryTab = () => {
      return tabs.find(tab => {
         return tab.id.includes(libraryTrackMark);
      })!;
   };

   const getCurrentTab = () => {
      return tabs.find(tab => tab.isCurrent);
   };

   const updateTab = (tabToUpdateID: UUID, payload: TabSlice) => {
      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            const isTabToUpdate = tab.id === tabToUpdateID;

            if (isTabToUpdate) {
               return { ...tab, [ payload.key ]: payload.data };
            }

            return tab;
         });
      });
   };

   const clearCurrentTab = () => {
      setTabs(prevTabs => {
         return prevTabs.map(tab => {
            return { ...tab, isCurrent: false };
         });
      });
   };

   const setCurrentTab = (tabToSetID: UUID) => {
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

   };

   const openTab = (tabToOpenID: UUID) => {
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
   };

   const switchToNextOpenTab = (tabLeftID: UUID) => {
      const previousTabIndex = tabs.filter(tab => tab.isOpen)
         .map(tab => tab.id)
         .indexOf(tabLeftID) - 1;

      const previousTab = tabs[ previousTabIndex ];

      setCurrentTab(
         previousTab
            ? previousTab.id
            : getLibraryTab().id
      );
   };

   const leaveTab = (tabLeftID: UUID) => {
      const didLeaveCurrentTab = getCurrentTab()?.id === tabLeftID;

      if (didLeaveCurrentTab) {
         switchToNextOpenTab(tabLeftID);
      }
   };

   const closeTab = (tabToClose: Tab) => {
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
   };

   const createTab = (tab: Tab) => {
      setTabs(prevTabs => [ ...prevTabs, tab ]);

      openTab(tab.id);
   };

   const deleteTab = (tabToDelete: Tab) => {
      setTabs(prevTabs => {
         return prevTabs.filter(tab => {
            return testConditions({
               isPermanent: () => tab.isPermanent || false,
               notTabToClose: () => tab.id !== tabToDelete.id
            }).any();
         });
      });

      leaveTab(tabToDelete.id);
   };

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
