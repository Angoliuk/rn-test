import colors from '@/ui/colors';
import { MotiView } from 'moti';
import React, { useCallback } from 'react';
import { I18nManager, Pressable, type PressableProps, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Text } from './text';

const SIZE = 20;
const WIDTH = 50;
const HEIGHT = 28;
const THUMB_HEIGHT = 22;
const THUMB_WIDTH = 22;
const THUMB_OFFSET = 4;

export interface RootProps extends Omit<PressableProps, 'onPress'> {
  accessibilityLabel: string;
  checked?: boolean;
  className?: string;
  onChange: (checked: boolean) => void;
}

export type IconProps = {
  checked: boolean;
};

export const Root = ({
  checked = false,
  children,
  className = '',
  disabled,
  onChange,
  ...props
}: RootProps) => {
  const handleChange = useCallback(() => {
    onChange(!checked);
  }, [onChange, checked]);

  return (
    <Pressable
      accessibilityState={{ checked }}
      className={`flex-row items-center ${className} ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
      onPress={handleChange}
      {...props}
    >
      {children}
    </Pressable>
  );
};

type LabelProps = {
  className?: string;
  testID?: string;
  text: string;
};

const Label = ({ className = '', testID, text }: LabelProps) => {
  return (
    <Text className={` ${className} pl-2`} testID={testID}>
      {text}
    </Text>
  );
};

export const CheckboxIcon = ({ checked = false }: IconProps) => {
  const color = checked ? colors.primary[300] : colors.charcoal[400];
  return (
    <MotiView
      animate={{
        backgroundColor: checked ? color : 'transparent',
        borderColor: color,
      }}
      className="items-center justify-center rounded-[5px] border-2"
      from={{ backgroundColor: 'transparent', borderColor: '#CCCFD6' }}
      style={{
        borderColor: color,
        height: SIZE,
        width: SIZE,
      }}
      transition={{
        backgroundColor: { duration: 100, type: 'timing' },
        borderColor: { duration: 100, type: 'timing' },
      }}
    >
      <MotiView
        animate={{ opacity: checked ? 1 : 0 }}
        from={{ opacity: 0 }}
        transition={{ opacity: { duration: 100, type: 'timing' } }}
      >
        <Svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <Path
            d="m16.726 7-.64.633c-2.207 2.212-3.878 4.047-5.955 6.158l-2.28-1.928-.69-.584L6 12.66l.683.577 2.928 2.477.633.535.591-.584c2.421-2.426 4.148-4.367 6.532-6.756l.633-.64L16.726 7Z"
            fill="#fff"
          />
        </Svg>
      </MotiView>
    </MotiView>
  );
};

const CheckboxRoot = ({ checked = false, children, ...props }: RootProps) => {
  return (
    <Root accessibilityRole="checkbox" checked={checked} {...props}>
      {children}
    </Root>
  );
};

const CheckboxBase = ({
  checked = false,
  label,
  testID,

  ...props
}: { label?: string } & RootProps) => {
  return (
    <CheckboxRoot checked={checked} testID={testID} {...props}>
      <CheckboxIcon checked={checked} />
      {label ? (
        <Label className="pr-2" testID={testID ? `${testID}-label` : undefined} text={label} />
      ) : null}
    </CheckboxRoot>
  );
};

export const Checkbox = Object.assign(CheckboxBase, {
  Icon: CheckboxIcon,
  Label,
  Root: CheckboxRoot,
});

export const RadioIcon = ({ checked = false }: IconProps) => {
  const color = checked ? colors.primary[300] : colors.charcoal[400];
  return (
    <MotiView
      animate={{
        borderColor: color,
      }}
      className="items-center justify-center rounded-[20px] border-2 bg-transparent"
      from={{ borderColor: '#CCCFD6' }}
      style={{
        borderColor: color,
        height: SIZE,
        width: SIZE,
      }}
      transition={{ borderColor: { duration: 100, type: 'timing' } }}
    >
      <MotiView
        animate={{ opacity: checked ? 1 : 0 }}
        className={`h-[10px] w-[10px] rounded-[10px] ${checked && 'bg-primary-300'} `}
        from={{ opacity: 0 }}
        transition={{ opacity: { duration: 50, type: 'timing' } }}
      />
    </MotiView>
  );
};

const RadioRoot = ({ checked = false, children, ...props }: RootProps) => {
  return (
    <Root accessibilityRole="radio" checked={checked} {...props}>
      {children}
    </Root>
  );
};

const RadioBase = ({
  checked = false,
  label,
  testID,
  ...props
}: { label?: string } & RootProps) => {
  return (
    <RadioRoot checked={checked} testID={testID} {...props}>
      <RadioIcon checked={checked} />
      {label ? <Label testID={testID ? `${testID}-label` : undefined} text={label} /> : null}
    </RadioRoot>
  );
};

export const Radio = Object.assign(RadioBase, {
  Icon: RadioIcon,
  Label,
  Root: RadioRoot,
});

export const SwitchIcon = ({ checked = false }: IconProps) => {
  const translateX = checked ? THUMB_OFFSET : WIDTH - THUMB_WIDTH - THUMB_OFFSET;

  const backgroundColor = checked ? colors.primary[300] : colors.charcoal[400];

  return (
    <View className="w-[50px] justify-center">
      <View className="overflow-hidden rounded-full">
        <View
          style={{
            backgroundColor,
            height: HEIGHT,
            width: WIDTH,
          }}
        />
      </View>
      <MotiView
        animate={{
          translateX: I18nManager.isRTL ? translateX : -translateX,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: 'white',
          borderRadius: 13,
          height: THUMB_HEIGHT,
          position: 'absolute',
          right: 0,
          width: THUMB_WIDTH,
        }}
        transition={{ translateX: { overshootClamping: true } }}
      />
    </View>
  );
};
const SwitchRoot = ({ checked = false, children, ...props }: RootProps) => {
  return (
    <Root accessibilityRole="switch" checked={checked} {...props}>
      {children}
    </Root>
  );
};

const SwitchBase = ({
  checked = false,
  label,
  testID,
  ...props
}: { label?: string } & RootProps) => {
  return (
    <SwitchRoot checked={checked} testID={testID} {...props}>
      <SwitchIcon checked={checked} />
      {label ? <Label testID={testID ? `${testID}-label` : undefined} text={label} /> : null}
    </SwitchRoot>
  );
};

export const Switch = Object.assign(SwitchBase, {
  Icon: SwitchIcon,
  Label,
  Root: SwitchRoot,
});
