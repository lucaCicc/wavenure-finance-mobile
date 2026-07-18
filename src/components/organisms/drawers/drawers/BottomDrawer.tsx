import React, {
    useCallback,
    forwardRef,
    useImperativeHandle,
    useState,
    useMemo,
    useEffect,
} from 'react';
import type { ViewProps } from 'react-native';
import { BackHandler, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    interpolateColor,
    runOnJS,
    useAnimatedProps,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '@common/colors';
import Text from '@components/atoms/text/Text';
import { IS_ANDROID, IS_IOS, SCREEN_HEIGHT } from '@utils/system.utils';

import styles from './bottom-drawer.styles';

export interface Props extends ViewProps {
    title?: string;
    isMaxHeight?: boolean;
    closeOnBackdrop?: boolean;
    stickyFooter?: React.ReactNode;
    disableAndroidAnimation?: boolean;
    onClose: () => void;
}

export interface BottomDrawerRefProps {
    open(): void;
    close(): void;
}

const BottomDrawer = forwardRef<BottomDrawerRefProps, Props>(
    (
        {
            children,
            stickyFooter,
            title,
            onClose,
            isMaxHeight,
            closeOnBackdrop = true,
            disableAndroidAnimation = false,
        },
        ref
    ) => {
        const { top: safeAreaTop, bottom: safeAreaBottom } = useSafeAreaInsets();
        const nativeGesture = Gesture.Native();

        const DRAWER_OPEN_Y = safeAreaTop;
        const DRAWER_CLOSE_Y = SCREEN_HEIGHT;
        const MAX_HEIGHT = IS_IOS ? SCREEN_HEIGHT : SCREEN_HEIGHT - safeAreaTop - 10;

        const [isPanScrollGesture, setIsPanScrollGesture] = useState(true);
        const backdropActive = useSharedValue(false);
        const drawerTranslation = useSharedValue(DRAWER_CLOSE_Y);
        const scrollRef = useAnimatedRef<Animated.ScrollView>();

        const cbAnimationClose = useCallback(() => {
            scrollRef.current?.scrollTo({
                x: 0,
                y: 0,
                animated: false,
            });

            setIsPanScrollGesture(true);
            onClose?.();
        }, [onClose, scrollRef]);

        const openDrawer = useCallback(() => {
            backdropActive.value = true;

            if (IS_ANDROID && disableAndroidAnimation) {
                drawerTranslation.value = DRAWER_OPEN_Y;
            } else {
                drawerTranslation.value = withTiming(DRAWER_OPEN_Y, {
                    duration: 500,
                    easing: Easing.out(Easing.exp),
                });
            }
        }, [DRAWER_OPEN_Y, backdropActive, drawerTranslation, disableAndroidAnimation]);

        const closeDrawer = useCallback(() => {
            backdropActive.value = false;

            drawerTranslation.value = withTiming(
                DRAWER_CLOSE_Y,
                {
                    duration: 500,
                    easing: Easing.out(Easing.exp),
                },
                () => {
                    runOnJS(cbAnimationClose)();
                }
            );
        }, [DRAWER_CLOSE_Y, backdropActive, cbAnimationClose, drawerTranslation]);

        useEffect(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                if (drawerTranslation.value === DRAWER_CLOSE_Y) {
                    return false;
                }
                closeDrawer();

                return true;
            });

            return () => backHandler.remove();
        }, [DRAWER_CLOSE_Y, closeDrawer, drawerTranslation.value, onClose]);

        useImperativeHandle(
            ref,
            () => ({
                open() {
                    openDrawer();
                },
                close() {
                    closeDrawer();
                },
            }),
            [closeDrawer, openDrawer]
        );

        const animatedStyle = useAnimatedStyle(
            () => ({ transform: [{ translateY: drawerTranslation.value }] }),
            []
        );

        const backdropStyle = useAnimatedStyle(
            () => ({
                backgroundColor: interpolateColor(
                    drawerTranslation.value,
                    [SCREEN_HEIGHT, 0],
                    [colors.defaultTransparent, colors.opacity60CodGray]
                ),
            }),
            []
        );

        const backdropProps = useAnimatedProps(
            () =>
                ({
                    pointerEvents: backdropActive.value ? 'auto' : 'none',
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }) as any,
            []
        );

        const headerPanGesture = Gesture.Pan()
            .onUpdate(({ translationY }) => {
                if (translationY > 0) {
                    drawerTranslation.value = Math.max(translationY, DRAWER_OPEN_Y);
                }
            })
            .onEnd(() => {
                if (drawerTranslation.value > 130) {
                    runOnJS(closeDrawer)();
                } else {
                    runOnJS(openDrawer)();
                }
            });

        const updatePanState = (offset: number) => {
            'worklet';
            if (offset > 0) {
                runOnJS(setIsPanScrollGesture)(false);
            } else if (offset === 0) {
                runOnJS(setIsPanScrollGesture)(true);
            }
        };

        const onScroll = useAnimatedScrollHandler({
            onBeginDrag({ contentOffset }) {
                updatePanState(contentOffset.y);
            },
            onEndDrag({ contentOffset }) {
                updatePanState(contentOffset.y);
            },
            onMomentumEnd({ contentOffset }) {
                updatePanState(contentOffset.y);
            },
        });

        const wrapperStyle = useMemo(
            () => [
                animatedStyle,
                styles.drawerContent,
                {
                    maxHeight: MAX_HEIGHT,
                    backgroundColor: colors.solidWhite,
                },
                isMaxHeight ? { height: MAX_HEIGHT } : {},
            ],
            [MAX_HEIGHT, animatedStyle, isMaxHeight]
        );

        const renderStickyHeader = useMemo(
            () => (
                <View style={styles.stickyHeaderWrapper}>
                    <View style={styles.notchContainer}>
                        <View style={styles.notchBar} />
                    </View>

                    {/* <IconButton
                        onPressOut={closeDrawer}
                        customStyle={styles.closeButton}
                        iconName="close-icon"
                        variant="beige"
                    /> */}

                    {title && (
                        <View style={styles.titleContainer}>
                            <Text variant="title" variantStyle="h2">
                                {title}
                            </Text>
                        </View>
                    )}
                </View>
            ),
            [closeDrawer, title]
        );

        const panScrollGesture = Gesture.Pan()
            .onBegin(() => null)
            .onUpdate(({ translationY }) => {
                if (translationY > 1) {
                    drawerTranslation.value = Math.max(translationY, DRAWER_OPEN_Y);
                }
            })
            .onEnd(() => {
                if (drawerTranslation.value > 130) {
                    runOnJS(closeDrawer)();
                } else {
                    runOnJS(openDrawer)();
                }
            })
            .enabled(isPanScrollGesture);

        /**
         * Main render
         *
         */
        return (
            <>
                <Animated.View
                    onTouchStart={closeOnBackdrop ? closeDrawer : undefined}
                    animatedProps={backdropProps}
                    style={[StyleSheet.absoluteFill, backdropStyle]}
                />
                <Animated.View style={wrapperStyle}>
                    <GestureDetector gesture={headerPanGesture}>
                        {renderStickyHeader}
                    </GestureDetector>

                    <GestureDetector
                        gesture={Gesture.Simultaneous(nativeGesture, panScrollGesture)}>
                        <Animated.ScrollView
                            ref={scrollRef}
                            contentContainerStyle={{
                                paddingBottom: safeAreaBottom + 16,
                            }}
                            showsVerticalScrollIndicator
                            scrollEventThrottle={16}
                            onScroll={onScroll}
                            bounces={false}>
                            {children}
                        </Animated.ScrollView>
                    </GestureDetector>

                    <View
                        style={{
                            marginBottom: DRAWER_OPEN_Y + safeAreaBottom,
                        }}>
                        {stickyFooter}
                    </View>
                </Animated.View>
            </>
        );
    }
);

export default React.memo(BottomDrawer);

BottomDrawer.displayName = 'BottomDrawer';
