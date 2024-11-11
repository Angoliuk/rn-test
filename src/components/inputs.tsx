import type { Option } from '@/ui';

import { Input, Select, View } from '@/ui';
import { Checkbox, Radio, Switch } from '@/ui';
import React from 'react';

import { Title } from './title';

const options: Option[] = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Vanilla', value: 'vanilla' },
];

export const Inputs = () => {
  const [value, setValue] = React.useState<number | string | undefined>();
  return (
    <>
      <Title text="Form" />
      <View>
        <Input label="Default" placeholder="Lorem ipsum dolor sit amet" />
        <Input error="This is a message error" label="Error" />
        <Input label="Focused" />
        <Select
          label="Select"
          onSelect={option => setValue(option)}
          options={options}
          value={value}
        />
        <CheckboxExample />
        <RadioExample />
        <SwitchExample />
      </View>
    </>
  );
};

const CheckboxExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox.Root
      accessibilityLabel="accept terms of condition"
      checked={checked}
      className="pb-2"
      onChange={setChecked}
    >
      <Checkbox.Icon checked={checked} />
      <Checkbox.Label text="checkbox" />
    </Checkbox.Root>
  );
};

const RadioExample = () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Radio.Root
      accessibilityLabel="radio button"
      checked={selected}
      className="pb-2"
      onChange={setSelected}
    >
      <Radio.Icon checked={selected} />
      <Radio.Label text="radio button" />
    </Radio.Root>
  );
};

const SwitchExample = () => {
  const [active, setActive] = React.useState(false);
  return (
    <Switch.Root accessibilityLabel="switch" checked={active} className="pb-2" onChange={setActive}>
      <Switch.Icon checked={active} />
      <Switch.Label text="switch" />
    </Switch.Root>
  );
};
