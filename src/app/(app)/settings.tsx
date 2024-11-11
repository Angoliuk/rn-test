/* eslint-disable react/react-in-jsx-scope */
import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import { translate, useAuth } from '@/core';
import { colors, FocusAwareStatusBar, ScrollView, Text, View } from '@/ui';
import { Github, Rate, Share, Support, Website } from '@/ui/icons';
import { Env } from '@env';
import { useColorScheme } from 'nativewind';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">{translate('settings.title')}</Text>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.support_us">
            <Item icon={<Share color={iconColor} />} onPress={() => {}} text="settings.share" />
            <Item icon={<Rate color={iconColor} />} onPress={() => {}} text="settings.rate" />
            <Item icon={<Support color={iconColor} />} onPress={() => {}} text="settings.support" />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item onPress={() => {}} text="settings.privacy" />
            <Item onPress={() => {}} text="settings.terms" />
            <Item icon={<Github color={iconColor} />} onPress={() => {}} text="settings.github" />
            <Item icon={<Website color={iconColor} />} onPress={() => {}} text="settings.website" />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item onPress={signOut} text="settings.logout" />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
