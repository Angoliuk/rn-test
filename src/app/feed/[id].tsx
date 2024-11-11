import { usePost } from '@/api';
import { ActivityIndicator, FocusAwareStatusBar, Text, View } from '@/ui';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

export default function Post() {
  const local = useLocalSearchParams<{ id: string }>();

  const { data, isError, isPending } = usePost({
    //@ts-ignore
    variables: { id: local.id },
  });

  if (isPending) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen options={{ headerBackTitle: 'Feed', title: 'Post' }} />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ headerBackTitle: 'Feed', title: 'Post' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading post</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-3 ">
      <Stack.Screen options={{ headerBackTitle: 'Feed', title: 'Post' }} />
      <FocusAwareStatusBar />
      <Text className="text-xl">{data.title}</Text>
      <Text>{data.body} </Text>
    </View>
  );
}
