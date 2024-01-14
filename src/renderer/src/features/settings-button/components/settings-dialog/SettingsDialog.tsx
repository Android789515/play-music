import { useContext, useState } from 'react';

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
   const { getCurrentSettings, changeSetting, saveAppliedSettings, revertChangedSettings } = useContext(settingsContext);

   const [ activeCategory, setActiveCategory ] = useState('general');

   const categories = Object.entries(getCurrentSettings())
      .map(([ settingSlice, settings ]) => {
         const [ name ] = settingSlice.split('Settings');
         
         return {
            name,
            component: (
               <Settings
                  settings={settings}
                  changeSetting={changeSetting}
               />
            ),
         };
      });

   

   const renderCategoryContent = (activeCategory: UUID) => {
      return categories.find(({ name }) => {
         const isActiveCategory = activeCategory === name;

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
            setActiveCategory={name => setActiveCategory(name)}
         />

         {renderCategoryContent(activeCategory)}
      </section>
   );
};
