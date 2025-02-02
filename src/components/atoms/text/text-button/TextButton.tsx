import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { ColorValue, StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';

import colors from '@common/colors';
import { commonStyle } from '@common/styles';
import Text from '@components/atoms/text/Text';
import { MainVariants, TypographyType } from 'types/typography';

export type Props<V extends MainVariants> = {
    variant: V;
    variantStyle: keyof TypographyType[V];
    textStyle?: StyleProp<TextStyle>;
    underlineColor?: ColorValue;
    showUnderline?: boolean;
    noWrap?: boolean;
    onPress?: () => void;
} & TouchableOpacityProps;

const TextButton = <V extends MainVariants>({
    variant,
    variantStyle,
    textStyle,
    children,
    showUnderline = false,
    underlineColor,
    noWrap = false,
    disabled,
    style,
    ...touchableOpacityProps
}: Props<V>) => {
    const txtColor = (textStyle as TextStyle)?.color;

    const txtStyle: StyleProp<TextStyle> = useMemo(
        () => [textStyle, disabled && { color: colors.tide }],
        [disabled, textStyle]
    );

    return (
        <TouchableOpacity disabled={disabled} activeOpacity={0.4} {...touchableOpacityProps}>
            <View style={[noWrap ? {} : commonStyle.wrap, style]}>
                <Text variant={variant} variantStyle={variantStyle} style={txtStyle}>
                    {children}
                </Text>
                {showUnderline && (
                    <View
                        style={[
                            styles.underline,
                            disabled
                                ? { borderColor: colors.lightGrey }
                                : { borderColor: txtColor ?? underlineColor },
                        ]}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    underline: {
        borderColor: colors.codGray3,
        borderBottomWidth: 1.1,
        top: -2.5,
    },
});

TextButton.displayName = 'TextButton';

export default TextButton;
