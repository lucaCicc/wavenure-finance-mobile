import React from 'react';
import type { ColorValue, ViewProps } from 'react-native';
import { View } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
} from 'react-native-reanimated';

import colors from '@common/colors';

import styles from './linear-progress-bar.styles';

export interface Props extends ViewProps {
    maxValue?: number;
    currentValue: number;
    progressColor?: ColorValue;
    emptyPartColor?: ColorValue;
    animationDelay?: number;
}

export const LinearProgressBar: React.FC<Props> = ({
    style,
    maxValue = 100,
    currentValue,
    progressColor,
    emptyPartColor,
    animationDelay = 0,
    ...otherProps
}) => {
    const checkedCurrentValue = currentValue > maxValue ? maxValue : currentValue;
    const currentProgress = (checkedCurrentValue / maxValue) * 100;

    const interpolationValue = useSharedValue(0);

    interpolationValue.value = withDelay(200, withTiming(currentProgress));

    const indicatorAnimation = useAnimatedStyle(
        () => ({
            width: `${interpolate(
                interpolationValue.value,
                [0, currentProgress],
                [0, currentProgress],
                Extrapolate.CLAMP
            )}%`,
        }),
        [currentProgress, interpolationValue.value]
    );

    return (
        <View style={[styles.linearProgressBar, style]} {...otherProps}>
            <View style={[styles.barLine, { backgroundColor: emptyPartColor }]} />

            <Animated.View
                style={[
                    styles.progressLine,
                    { backgroundColor: progressColor ?? colors.mercury },
                    indicatorAnimation,
                ]}
            />
        </View>
    );
};

LinearProgressBar.displayName = 'LinearProgressBar';

export default LinearProgressBar;
