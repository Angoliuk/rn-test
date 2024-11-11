import type { Post } from '@/api';

import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { EmptyList, FocusAwareStatusBar, Text, View } from '@/ui';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

export default function Feed() {
  const { data, isError, isPending } = usePosts();
  const renderItem = React.useCallback(({ item }: { item: Post }) => <Card {...item} />, []);

  if (isError) {
    return (
      <View>
        <Text> Error Loading data </Text>
      </View>
    );
  }
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <FlashList
        data={data}
        estimatedItemSize={300}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={isPending} />}
        renderItem={renderItem}
      />
    </View>
  );
}
