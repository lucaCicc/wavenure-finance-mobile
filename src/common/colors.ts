// Name your colors @link: http://chir.ag/projects/name-that-color/

const colors = {
    solidWhite: '#FFFFFF',
    solidBlack: '#000',
    gallery: '#EFEFEF',
    galleryPressale: '#bfbfc1',
    blue: '#4B5EFC',
    gray: '#4E505F',
    drak: '#2E2F38',
    palma: '#3A9512',
    mandy: '#EB515A',
    palmaPressale: '#008F2C',
    bluePressable: '#6D7FFB',
    grayPressable: '#6C6E7D',
    darkPressable: '#4B4C55',
    // Colors with opacity
    defaultTransparent: 'transparent',
    opacity30Black: 'rgba(0, 0, 0, 0.30)',
    transparent: 'rgba(255, 255, 255, 0.0)',
    opacity60CodGray: 'rgba(30, 30, 30, 0.60)',
    opacity30: 'rgba(255, 255, 255, 0.30)',
    opacity20: 'rgba(255, 255, 255, 0.20)',
    opacity16: 'rgba(255, 255, 255, 0.16)',
    opacity10: 'rgba(255, 255, 255, 0.10)',
    opacity08: 'rgba(255, 255, 255, 0.08)',
    opacity01: 'rgba(255, 255, 255, 0.01)',
    opacity24: 'rgba(255, 255, 255, 0.24)',
} as const;

export type ColorKeys = keyof typeof colors;

export default colors;
