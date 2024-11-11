import type { TxKeyPath } from '@/core/i18n';
import type { TextProps, TextStyle } from 'react-native';

import { translate } from '@/core/i18n';
import React from 'react';
import { I18nManager, Text as NNText, StyleSheet } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
}

export const Text = ({ children, className = '', style, tx, ...props }: Props) => {
  const textStyle = React.useMemo(
    () => twMerge('text-base text-black  dark:text-white  font-inter font-normal', className),
    [className],
  );

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]) as TextStyle,
    [style],
  );
  return (
    <NNText className={textStyle} style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </NNText>
  );
};
