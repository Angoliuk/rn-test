/**
 * Modal
 * Dependencies:
 * - @gorhom/bottom-sheet.
 *
 * Props:
 * - All `BottomSheetModalProps` props.
 * - `title` (string | undefined): Optional title for the modal header.
 *
 * Usage Example:
 * import { Modal, useModal } from '@gorhom/bottom-sheet';
 *
 * function DisplayModal() {
 *   const { ref, present, dismiss } = useModal();
 *
 *   return (
 *     <View>
 *       <Modal
 *         snapPoints={['60%']} // optional
 *         title="Modal Title"
 *         ref={ref}
 *       >
 *         Modal Content
 *       </Modal>
 *     </View>
 *   );
 * }
 *
 */

import type { BottomSheetBackdropProps, BottomSheetModalProps } from '@gorhom/bottom-sheet';

import { BottomSheetModal, useBottomSheet } from '@gorhom/bottom-sheet';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

import { Text } from './text';

type ModalProps = {
  title?: string;
} & BottomSheetModalProps;

type ModalRef = React.ForwardedRef<BottomSheetModal>;

type ModalHeaderProps = {
  dismiss: () => void;
  title?: string;
};

export const useModal = () => {
  const ref = React.useRef<BottomSheetModal>(null);
  const present = React.useCallback((data?: any) => {
    ref.current?.present(data);
  }, []);
  const dismiss = React.useCallback(() => {
    ref.current?.dismiss();
  }, []);
  return { dismiss, present, ref };
};

export const Modal = React.forwardRef(
  (
    { detached = false, snapPoints: _snapPoints = ['60%'], title, ...props }: ModalProps,
    ref: ModalRef,
  ) => {
    const detachedProps = React.useMemo(() => getDetachedProps(detached), [detached]);
    const modal = useModal();
    const snapPoints = React.useMemo(() => _snapPoints, [_snapPoints]);

    React.useImperativeHandle(ref, () => (modal.ref.current as BottomSheetModal) || null);

    const renderHandleComponent = React.useCallback(
      () => (
        <>
          <View className="mb-8 mt-2 h-1 w-12 self-center rounded-lg bg-gray-400 dark:bg-gray-700" />
          <ModalHeader dismiss={modal.dismiss} title={title} />
        </>
      ),
      [title, modal.dismiss],
    );

    return (
      <BottomSheetModal
        {...props}
        {...detachedProps}
        backdropComponent={props.backdropComponent || renderBackdrop}
        handleComponent={renderHandleComponent}
        index={0}
        ref={modal.ref}
        snapPoints={snapPoints}
      />
    );
  },
);

/**
 * Custom Backdrop
 */

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CustomBackdrop = ({ style }: BottomSheetBackdropProps) => {
  const { close } = useBottomSheet();
  return (
    <AnimatedPressable
      entering={FadeIn.duration(50)}
      exiting={FadeOut.duration(20)}
      onPress={() => close()}
      // eslint-disable-next-line react-native/no-inline-styles
      style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]}
    />
  );
};

export const renderBackdrop = (props: BottomSheetBackdropProps) => <CustomBackdrop {...props} />;

/**
 *
 * @param detached
 * @returns
 *
 * @description
 * In case the modal is detached, we need to add some extra props to the modal to make it look like a detached modal.
 */

const getDetachedProps = (detached: boolean) => {
  if (detached) {
    return {
      bottomInset: 46,
      detached: true,
      style: { marginHorizontal: 16, overflow: 'hidden' },
    } as Partial<BottomSheetModalProps>;
  }
  return {} as Partial<BottomSheetModalProps>;
};

/**
 * ModalHeader
 */

const ModalHeader = React.memo(({ dismiss, title }: ModalHeaderProps) => {
  return (
    <>
      {title && (
        <View className="flex-row px-2 py-4">
          <View className="h-[24px] w-[24px]" />
          <View className="flex-1">
            <Text className="text-center text-[16px] font-bold text-[#26313D] dark:text-white">
              {title}
            </Text>
          </View>
        </View>
      )}
      <CloseButton close={dismiss} />
    </>
  );
});

const CloseButton = ({ close }: { close: () => void }) => {
  return (
    <Pressable
      accessibilityHint="closes the modal"
      accessibilityLabel="close modal"
      accessibilityRole="button"
      className="absolute right-3 top-3 h-[24px] w-[24px] items-center justify-center "
      hitSlop={{ bottom: 20, left: 20, right: 20, top: 20 }}
      onPress={close}
    >
      <Svg
        className="fill-neutral-300 dark:fill-white"
        fill="none"
        height={24}
        viewBox="0 0 24 24"
        width={24}
      >
        <Path d="M18.707 6.707a1 1 0 0 0-1.414-1.414L12 10.586 6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293Z" />
      </Svg>
    </Pressable>
  );
};
