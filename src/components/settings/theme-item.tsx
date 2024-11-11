import type { ColorSchemeType } from '@/core';
import type { Option } from '@/ui';

import { translate, useSelectedTheme } from '@/core';
import { Options, useModal } from '@/ui';
import React from 'react';

import { Item } from './item';

export const ThemeItem = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const modal = useModal();

  const onSelect = React.useCallback(
    (option: Option) => {
      setSelectedTheme(option.value as ColorSchemeType);
      modal.dismiss();
    },
    [setSelectedTheme, modal],
  );

  const themes = React.useMemo(
    () => [
      { label: `${translate('settings.theme.dark')} 🌙`, value: 'dark' },
      { label: `${translate('settings.theme.light')} 🌞`, value: 'light' },
      { label: `${translate('settings.theme.system')} ⚙️`, value: 'system' },
    ],
    [],
  );

  const theme = React.useMemo(
    () => themes.find(t => t.value === selectedTheme),
    [selectedTheme, themes],
  );

  return (
    <>
      <Item onPress={modal.present} text="settings.theme.title" value={theme?.label} />
      <Options onSelect={onSelect} options={themes} ref={modal.ref} value={theme?.value} />
    </>
  );
};
