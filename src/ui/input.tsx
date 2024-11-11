import type { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import type { TextInput, TextInputProps } from 'react-native';

import * as React from 'react';
import { useController } from 'react-hook-form';
import { I18nManager, StyleSheet, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { Text } from './text';

const inputTv = tv({
  defaultVariants: {
    disabled: false,
    error: false,
    focused: false,
  },

  slots: {
    container: 'mb-2',
    input:
      'mt-0 rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3 font-inter text-base  font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
  },
  variants: {
    disabled: {
      true: {
        input: 'bg-neutral-200',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    focused: {
      true: {
        input: 'border-neutral-400 dark:border-neutral-300',
      },
    },
  },
});

export interface NInputProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  label?: string;
}

type TRule = Omit<RegisterOptions, 'setValueAs' | 'valueAsDate' | 'valueAsNumber'>;

export type RuleType<T> = { [name in keyof T]: TRule };
export type InputControllerType<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  rules?: TRule;
};

interface ControlledInputProps<T extends FieldValues> extends NInputProps, InputControllerType<T> {}

export const Input = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const { error, label, testID, ...inputProps } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const styles = React.useMemo(
    () =>
      inputTv({
        disabled: Boolean(props.disabled),
        error: Boolean(error),
        focused: isFocussed,
      }),
    [error, isFocussed, props.disabled],
  );

  return (
    <View className={styles.container()}>
      {label && (
        <Text className={styles.label()} testID={testID ? `${testID}-label` : undefined}>
          {label}
        </Text>
      )}
      <NTextInput
        className={styles.input()}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholderTextColor={colors.neutral[400]}
        ref={ref}
        testID={testID}
        {...inputProps}
        style={StyleSheet.flatten([
          { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
          { textAlign: I18nManager.isRTL ? 'right' : 'left' },
          inputProps.style,
        ])}
      />
      {error && (
        <Text
          className="text-sm text-danger-400 dark:text-danger-600"
          testID={testID ? `${testID}-error` : undefined}
        >
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(props: ControlledInputProps<T>) {
  const { control, name, rules, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      autoCapitalize="none"
      onChangeText={field.onChange}
      ref={field.ref}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
    />
  );
}
