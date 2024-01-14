import { useContext, useMemo, useState } from 'react';
import { v4 as newUUID } from 'uuid';

import type { UUID } from '@globalTypes/stringTypes';
import { settingsContext } from 'features/settings/SettingsProvider';

import styles from './SettingsDialog.module.scss';

import { Categories } from '../categories';
import { Settings } from '../settings/Settings';
import { DialogSubmitter } from 'components/dialog/components/dialog-submitter';

interface Props {
   formID: UUID;
}

export const SettingsDialog = ({ formID }: Props) => {
   const { getCurrentSettings, saveAppliedSettings, revertChangedSettings } = useContext(settingsContext);

   const categories = useMemo(() => {
      return Object.entries(getCurrentSettings())
         .map(([settingSlice, settings]) => {
            const [name] = settingSlice.split('Settings');

            return {
               id: newUUID(),
               name,
               component: (
                  <Settings
                     settings={settings}
                  />
               ),
            };
         });
   }, [ getCurrentSettings ]);

   const firstCategoryID = categories[0].id;
   const [ activeCategory, setActiveCategory ] = useState<UUID>(firstCategoryID);

   const renderCategoryContent = (activeCategory: UUID) => {
      return categories.find(({ id }) => {
         const isActiveCategory = activeCategory === id;

         return isActiveCategory;
      })?.component;
   };

   return (
      <section
         className={styles.dialogContent}
      >
         <DialogSubmitter
            formID={formID}
            customStyles={styles.submission}
            onConfirm={saveAppliedSettings}
            onCancel={revertChangedSettings}
         />

         <Categories
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={id => setActiveCategory(id)}
         />

         {renderCategoryContent(activeCategory)}
      </section>
   );
};
