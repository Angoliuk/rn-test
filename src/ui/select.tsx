import type { FieldValues } from 'react-hook-form';
import type { SvgProps } from 'react-native-svg';

import colors from '@/ui/colors';
import { CaretDown } from '@/ui/icons';
import { BottomSheetFlatList, type BottomSheetModal } from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { useController } from 'react-hook-form';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Pressable, type PressableProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { tv } from 'tailwind-variants';

import type { InputControllerType } from './input';

import { useModal } from './modal';
import { Modal } from './modal';
import { Text } from './text';

const selectTv = tv({
  defaultVariants: {
    disabled: false,
    error: false,
  },

  slots: {
    container: 'mb-4',
    input:
      'border-grey-50 mt-0 flex-row items-center justify-center rounded-xl border-[0.5px] p-3  dark:border-neutral-500 dark:bg-neutral-800',
    inputValue: 'dark:text-neutral-100',
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
        inputValue: 'text-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    focused: {
      true: {
        input: 'border-neutral-600',
      },
    },
  },
});

const List = Platform.OS === 'web' ? FlashList : BottomSheetFlatList;

export type Option = { label: string; value: number | string };

type OptionsProps = {
  onSelect: (option: Option) => void;
  options: Option[];
  testID?: string;
  value?: number | string;
};

function keyExtractor(item: Option) {
  return `select-item-${item.value}`;
}

export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  ({ onSelect, options, testID, value }, ref) => {
    const height = options.length * 70 + 100;
    const snapPoints = React.useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const renderSelectItem = React.useCallback(
      ({ item }: { item: Option }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          onPress={() => onSelect(item)}
          selected={value === item.value}
          testID={testID ? `${testID}-item-${item.value}` : undefined}
        />
      ),
      [onSelect, value, testID],
    );

    return (
      <Modal
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
        index={0}
        ref={ref}
        snapPoints={snapPoints}
      >
        <List
          data={options}
          estimatedItemSize={52}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
          testID={testID ? `${testID}-modal` : undefined}
        />
      </Modal>
    );
  },
);

const Option = React.memo(
  ({
    label,
    selected = false,
    ...props
  }: {
    label: string;
    selected?: boolean;
  } & PressableProps) => {
    return (
      <Pressable
        className="flex-row items-center border-b border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
        {...props}
      >
        <Text className="flex-1 dark:text-neutral-100 ">{label}</Text>
        {selected && <Check />}
      </Pressable>
    );
  },
);

export interface SelectProps {
  disabled?: boolean;
  error?: string;
  label?: string;
  onSelect?: (value: number | string) => void;
  options?: Option[];
  placeholder?: string;
  testID?: string;
  value?: number | string;
}
interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

export const Select = (props: SelectProps) => {
  const {
    disabled = false,
    error,
    label,
    onSelect,
    options = [],
    placeholder = 'select...',
    testID,
    value,
  } = props;
  const modal = useModal();

  const onSelectOption = React.useCallback(
    (option: Option) => {
      onSelect?.(option.value);
      modal.dismiss();
    },
    [modal, onSelect],
  );

  const styles = React.useMemo(
    () =>
      selectTv({
        disabled,
        error: Boolean(error),
      }),
    [error, disabled],
  );

  const textValue = React.useMemo(
    () =>
      value !== undefined
        ? options?.filter(t => t.value === value)?.[0]?.label ?? placeholder
        : placeholder,
    [value, options, placeholder],
  );

  return (
    <>
      <View className={styles.container()}>
        {label && (
          <Text className={styles.label()} testID={testID ? `${testID}-label` : undefined}>
            {label}
          </Text>
        )}
        <TouchableOpacity
          className={styles.input()}
          disabled={disabled}
          onPress={modal.present}
          testID={testID ? `${testID}-trigger` : undefined}
        >
          <View className="flex-1">
            <Text className={styles.inputValue()}>{textValue}</Text>
          </View>
          <CaretDown />
        </TouchableOpacity>
        {error && (
          <Text className="text-sm text-danger-300 dark:text-danger-600" testID={`${testID}-error`}>
            {error}
          </Text>
        )}
      </View>
      <Options onSelect={onSelectOption} options={options} ref={modal.ref} testID={testID} />
    </>
  );
};

// only used with react-hook-form
export function ControlledSelect<T extends FieldValues>(props: ControlledSelectProps<T>) {
  const { control, name, onSelect: onNSelect, rules, ...selectProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  const onSelect = React.useCallback(
    (value: number | string) => {
      field.onChange(value);
      onNSelect?.(value);
    },
    [field, onNSelect],
  );
  return (
    <Select
      error={fieldState.error?.message}
      onSelect={onSelect}
      value={field.value}
      {...selectProps}
    />
  );
}

const Check = ({ ...props }: SvgProps) => (
  <Svg
    fill="none"
    height={24}
    viewBox="0 0 25 24"
    width={25}
    {...props}
    className="stroke-black dark:stroke-white"
  >
    <Path
      d="m20.256 6.75-10.5 10.5L4.506 12"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.438}
    />
  </Svg>
);
