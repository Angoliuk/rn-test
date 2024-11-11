import type { TxKeyPath } from '@/core';

import { Pressable, Text, View } from '@/ui';
import { ArrowRight } from '@/ui/icons';
import * as React from 'react';

type ItemProps = {
  icon?: React.ReactNode;
  onPress?: () => void;
  text: TxKeyPath;
  value?: string;
};

export const Item = ({ icon, onPress, text, value }: ItemProps) => {
  const isPressable = onPress !== undefined;
  return (
    <Pressable
      className="flex-1 flex-row items-center justify-between px-4 py-2"
      onPress={onPress}
      pointerEvents={isPressable ? 'auto' : 'none'}
    >
      <View className="flex-row items-center">
        {icon && <View className="pr-2">{icon}</View>}
        <Text tx={text} />
      </View>
      <View className="flex-row items-center">
        <Text className="text-neutral-600 dark:text-white">{value}</Text>
        {isPressable && (
          <View className="pl-2">
            <ArrowRight />
          </View>
        )}
      </View>
    </Pressable>
  );
};
