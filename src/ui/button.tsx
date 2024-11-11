import type { PressableProps, View } from 'react-native';
import type { VariantProps } from 'tailwind-variants';

import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { tv } from 'tailwind-variants';

const button = tv({
  defaultVariants: {
    disabled: false,
    fullWidth: true,
    size: 'default',
    variant: 'default',
  },

  slots: {
    container: 'my-2 flex flex-row items-center justify-center rounded-md px-4',
    indicator: 'h-6 text-white',
    label: 'font-inter text-base font-semibold',
  },
  variants: {
    disabled: {
      true: {
        container: 'bg-neutral-300 dark:bg-neutral-300',
        indicator: 'text-neutral-400 dark:text-neutral-400',
        label: 'text-neutral-600 dark:text-neutral-600',
      },
    },
    fullWidth: {
      false: {
        container: 'self-center',
      },
      true: {
        container: '',
      },
    },
    size: {
      default: {
        container: 'h-10 px-4',
        label: 'text-base',
      },
      icon: { container: 'h-9 w-9' },
      lg: {
        container: 'h-12 px-8',
        label: 'text-xl',
      },
      sm: {
        container: 'h-8 px-3',
        indicator: 'h-2',
        label: 'text-sm',
      },
    },
    variant: {
      default: {
        container: 'bg-black dark:bg-white',
        indicator: 'text-white dark:text-black',
        label: 'text-white dark:text-black',
      },
      destructive: {
        container: 'bg-red-600',
        indicator: 'text-white',
        label: 'text-white',
      },
      ghost: {
        container: 'bg-transparent',
        indicator: 'text-black dark:text-white',
        label: 'text-black underline dark:text-white',
      },
      link: {
        container: 'bg-transparent',
        indicator: 'text-black',
        label: 'text-black',
      },
      outline: {
        container: 'border border-neutral-400',
        indicator: 'text-black dark:text-neutral-100',
        label: 'text-black dark:text-neutral-100',
      },
      secondary: {
        container: 'bg-primary-600',
        indicator: 'text-white',
        label: 'text-secondary-600',
      },
    },
  },
});

type ButtonVariants = VariantProps<typeof button>;
interface Props extends ButtonVariants, Omit<PressableProps, 'disabled'> {
  className?: string;
  label?: string;
  loading?: boolean;
  textClassName?: string;
}

export const Button = React.forwardRef<View, Props>(
  (
    {
      className = '',
      disabled = false,
      label: text,
      loading = false,
      size = 'default',
      testID,
      textClassName = '',
      variant = 'default',
      ...props
    },
    ref,
  ) => {
    const styles = React.useMemo(
      () => button({ disabled, size, variant }),
      [variant, disabled, size],
    );

    return (
      <Pressable
        className={styles.container({ className })}
        disabled={disabled || loading}
        {...props}
        ref={ref}
        testID={testID}
      >
        {props.children ? (
          props.children
        ) : (
          <>
            {loading ? (
              <ActivityIndicator
                className={styles.indicator()}
                size="small"
                testID={testID ? `${testID}-activity-indicator` : undefined}
              />
            ) : (
              <Text
                className={styles.label({ className: textClassName })}
                testID={testID ? `${testID}-label` : undefined}
              >
                {text}
              </Text>
            )}
          </>
        )}
      </Pressable>
    );
  },
);
