import { Widget } from 'components/widget/Widget';
import { AppHeaderLayout } from './components';

import { Tabs } from 'features/tabs';
import { NewTabButton } from 'features/new-tab-button';

import { SearchProvider } from 'components/search-bar';
import { SearchBar } from 'components/search-bar';

import { SettingsButton } from 'features/settings-button';

export const AppHeader = () => {
   return (
      <header>
         <Widget borderSide='bottom'>
            <AppHeaderLayout>
               <Tabs />

               <NewTabButton />

               <SearchProvider
                  Consumer={SearchBar}
               />

               <SettingsButton />
            </AppHeaderLayout>
         </Widget>
      </header>
   );
};
