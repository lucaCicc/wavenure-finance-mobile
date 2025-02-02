import type { TextStyle } from 'react-native';

export type MainVariants = 'display' | 'title' | 'label' | 'text' | 'link' | 'privacy';

export type TypographyType = {
    display: {
        'medium-bold': TextStyle;
    };
    title: {
        h1: TextStyle;
        h2: TextStyle;
        h3: TextStyle;
        h4: TextStyle;
        h5: TextStyle;
        little: TextStyle;
        slim: TextStyle;
        xl: TextStyle;
        xxl: TextStyle;
    };
    label: {
        data: TextStyle;
        input: TextStyle;
        'input-medium': TextStyle;
        'input-medium-medium': TextStyle;
        chipsStatus: TextStyle;
        tagStatus: TextStyle;
        primaryCTA: TextStyle;
        primaryCTASmall: TextStyle;
        menuItem: TextStyle;
        tagItem: TextStyle;
        segmentedControl: TextStyle;
    };
    text: {
        'paragraph-large-bold': TextStyle;
        'paragraph-large-medium': TextStyle;
        'paragraph-medium-bold': TextStyle;
        'paragraph-small-semibold': TextStyle;
        'paragraph-medium-medium': TextStyle;
        'paragraph-small-bold': TextStyle;
        'paragraph-small-medium': TextStyle;
        'paragraph-extra-small-medium': TextStyle;
        introduction: TextStyle;
    };
    link: {
        'paragraph-large-bold': TextStyle;
        'paragraph-large-medium': TextStyle;
        'paragraph-small-bold': TextStyle;
    };
    privacy: {
        'paragraph-medium-medium': TextStyle;
        'paragraph-medium-semibold': TextStyle;
    };
};
