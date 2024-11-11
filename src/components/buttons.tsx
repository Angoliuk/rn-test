import { Button, View } from '@/ui';
import React from 'react';

import { Title } from './title';

export const Buttons = () => {
  return (
    <>
      <Title text="Buttons" />
      <View>
        <View className="flex-row  flex-wrap">
          <Button className="mr-2" label="small" size="sm" />
          <Button className="mr-2 min-w-[60px]" label="small" loading size="sm" />
          <Button className="mr-2" label="small" size="sm" variant="secondary" />
          <Button className="mr-2" label="small" size="sm" variant="outline" />
          <Button className="mr-2" label="small" size="sm" variant="destructive" />
          <Button className="mr-2" label="small" size="sm" variant="ghost" />
          <Button className="mr-2" disabled label="small" size="sm" />
        </View>
        <Button label="Default Button" />
        <Button label="Secondary Button" variant="secondary" />
        <Button label="Outline Button" variant="outline" />
        <Button label="Destructive Button" variant="destructive" />
        <Button label="Ghost Button" variant="ghost" />
        <Button label="Button" loading={true} />
        <Button label="Button" loading={true} variant="outline" />
        <Button disabled label="Default Button Disabled" />
        <Button disabled label="Secondary Button Disabled" variant="secondary" />
      </View>
    </>
  );
};
