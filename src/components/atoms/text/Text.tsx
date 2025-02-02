import React, { useMemo } from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { StyleSheet, Text as TextNative } from 'react-native';

import typography from '@components/atoms/text/typography';
import type { MainVariants, TypographyType } from 'types/typography';

export type Props<V extends MainVariants> = {
    variant: V;
    variantStyle: keyof TypographyType[V];
} & TextProps;

const Text = <V extends MainVariants>({ variant, variantStyle, children, ...rest }: Props<V>) => {
    const textStyle: TextStyle = useMemo(
        () => typography[variant][variantStyle] as TextStyle,
        [variant, variantStyle]
    );

    return (
        <TextNative
            {...rest}
            style={StyleSheet.compose(textStyle, rest.style)}
            allowFontScaling={false}>
            {children}
        </TextNative>
    );
};

Text.displayName = 'Text';

export default Text;
