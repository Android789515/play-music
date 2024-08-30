import { useTabs } from 'features/tabs';

import { Widget } from 'components/widget/Widget';
import { AppHeaderLayout } from './components';

import { Tabs } from 'features/tabs';
import { NewTabButton } from 'features/new-tab-button';

import { SearchProvider } from 'components/search-bar';
import { SearchBar } from 'components/search-bar';

import { AddStuffButton } from 'features/library-view/components/add-stuff-button';

import { SettingsButton } from 'features/settings-button';

export const AppHeader = () => {
   const { getTabs, getCurrentTab } = useTabs();

   return (
      <header>
         <Widget borderSide='bottom'>
            <AppHeaderLayout>
               <Tabs
                  tabs={getTabs()}
               />

               <NewTabButton />

               <SearchProvider
                  Consumer={SearchBar}
               />

               <AddStuffButton
                  tab={getCurrentTab()!}
                  header
               />

               <SettingsButton />
            </AppHeaderLayout>
         </Widget>
      </header>
   );
};
