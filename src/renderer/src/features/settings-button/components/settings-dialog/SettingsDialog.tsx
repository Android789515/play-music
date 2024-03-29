import { useContext, useState } from 'react';

import type { UUID } from '@globalTypes/stringTypes';
import type { SettingsStateSlice } from 'features/settings-provider/types';
import { settingsContext } from 'features/settings-provider/SettingsProvider';
import { aboutSectionName } from '../about-section';

import styles from './SettingsDialog.module.scss';

import { Categories } from '../categories';
import { Settings } from '../settings/Settings';
import { DialogSubmitter } from 'components/dialog/components/dialog-submitter';
import { AboutSection } from '../about-section';

interface Props {
   formID: UUID;
}

export const SettingsDialog = ({ formID }: Props) => {
   const { getChangedSettings, changeSetting, saveAppliedSettings, revertChangedSettings } = useContext(settingsContext);

   const [ activeCategory, setActiveCategory ] = useState('general');

   const categories = Object.entries(getChangedSettings())
      .map(([ settingSlice, settings ]) => {
         const [ name ] = settingSlice.split('Settings');

         return {
            name,
            component: (
               <Settings
                  settings={settings}
                  settingsName={settingSlice as SettingsStateSlice}
                  changeSetting={changeSetting}
               />
            ),
         };
      });

   const renderCategoryContent = (activeCategory: string) => {
      const isAboutSection = activeCategory === aboutSectionName;

      if (isAboutSection) {
         return (
            <AboutSection />
         );
      } else {
         return categories.find(({ name }) => {
            const isActiveCategory = activeCategory === name;

            return isActiveCategory;
         })?.component;
      }
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
