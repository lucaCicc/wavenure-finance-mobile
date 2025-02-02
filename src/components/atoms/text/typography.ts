import families from '@common/fonts';
import { TypographyType } from 'types/typography';

const typography: TypographyType = {
    display: {
        'medium-bold': {
            fontFamily: families.extraBold,
            fontSize: 32,
            lineHeight: 48,
        },
    },
    title: {
        h1: {
            fontFamily: families.extraBold,
            fontSize: 24,
            lineHeight: 36,
        },
        h2: {
            fontFamily: families.bold,
            fontSize: 22,
            lineHeight: 32,
        },
        h3: {
            fontFamily: families.bold,
            fontSize: 20,
            lineHeight: 28,
        },
        h4: {
            fontFamily: families.bold,
            fontSize: 18,
            lineHeight: 28,
        },
        h5: {
            fontFamily: families.bold,
            fontSize: 14,
            lineHeight: 20,
        },
        little: {
            fontFamily: families.bold,
            fontSize: 14,
            lineHeight: 22,
        },
        slim: {
            fontFamily: families.regular,
            fontSize: 14,
        },
        xl: {
            fontFamily: families.bold,
            fontSize: 38,
        },
        xxl: {
            fontFamily: families.extraBold,
            fontSize: 52,
        },
    },
    label: {
        data: {
            fontFamily: families.bold,
            fontSize: 24,
            lineHeight: 36,
        },
        input: {
            fontFamily: families.semiBold,
            fontSize: 12,
            lineHeight: 18,
        },
        'input-medium': {
            fontFamily: families.semiBold,
            fontSize: 15,
            lineHeight: 18,
        },
        'input-medium-medium': {
            fontFamily: families.medium,
            fontSize: 15,
            lineHeight: 18,
        },
        chipsStatus: {
            fontFamily: families.extraBold,
            fontSize: 14,
            lineHeight: 22,
        },
        tagStatus: {
            fontFamily: families.bold,
            fontSize: 14,
            lineHeight: 20,
        },
        primaryCTA: {
            fontFamily: families.bold,
            fontSize: 16,
            lineHeight: 22,
        },
        primaryCTASmall: {
            fontFamily: families.bold,
            fontSize: 14,
            lineHeight: 20,
        },
        menuItem: {
            fontFamily: families.semiBold,
            fontSize: 12,
            lineHeight: 12,
        },
        tagItem: {
            fontFamily: families.regular,
            fontSize: 12,
            lineHeight: 20,
        },
        segmentedControl: {
            fontFamily: families.semiBold,
            fontSize: 14,
            lineHeight: 20,
        },
    },
    text: {
        'paragraph-large-bold': {
            fontFamily: families.bold,
            fontSize: 18,
            lineHeight: 28,
        },
        'paragraph-large-medium': {
            fontFamily: families.medium,
            fontSize: 18,
            lineHeight: 28,
        },
        'paragraph-medium-bold': {
            fontFamily: families.bold,
            fontSize: 16,
            lineHeight: 24,
        },
        'paragraph-medium-medium': {
            fontFamily: families.medium,
            fontSize: 16,
            lineHeight: 24,
        },
        'paragraph-small-semibold': {
            fontFamily: families.semiBold,
            fontSize: 14,
            lineHeight: 20,
        },
        'paragraph-small-bold': {
            fontFamily: families.bold,
            fontSize: 14,
            lineHeight: 20,
        },
        'paragraph-small-medium': {
            fontFamily: families.medium,
            fontSize: 14,
            lineHeight: 20,
        },
        'paragraph-extra-small-medium': {
            fontFamily: families.medium,
            fontSize: 12,
            lineHeight: 16,
        },
        introduction: {
            fontFamily: families.medium,
            fontSize: 14,
            lineHeight: 22,
        },
    },
    link: {
        'paragraph-large-bold': {
            fontFamily: families.bold,
            fontSize: 16,
            lineHeight: 22,
        },
        'paragraph-large-medium': {
            fontFamily: families.bold,
            fontSize: 14,
            lineHeight: 22,
        },
        'paragraph-small-bold': {
            fontFamily: families.bold,
            fontSize: 12,
            lineHeight: 16,
        },
    },
    privacy: {
        'paragraph-medium-medium': {
            fontFamily: families.medium,
            fontSize: 8,
            lineHeight: 12,
        },
        'paragraph-medium-semibold': {
            fontFamily: families.semiBold,
            fontSize: 8,
            lineHeight: 12,
        },
    },
};

export default typography;
