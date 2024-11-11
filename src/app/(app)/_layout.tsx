/* eslint-disable react/no-unstable-nested-components */
import { useAuth, useIsFirstTime } from '@/core';
import { Pressable, Text } from '@/ui';
import { Feed as FeedIcon, Settings as SettingsIcon, Style as StyleIcon } from '@/ui/icons';
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerRight: () => <CreateNewPostLink />,
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          tabBarTestID: 'feed-tab',
          title: 'Feed',
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <StyleIcon color={color} />,
          tabBarTestID: 'style-tab',
          title: 'Style',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
          tabBarTestID: 'settings-tab',
          title: 'Settings',
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link asChild href="/feed/add-post">
      <Pressable>
        <Text className="px-3 text-primary-300">Create</Text>
      </Pressable>
    </Link>
  );
};
