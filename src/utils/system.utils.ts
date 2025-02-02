import { Platform, Dimensions } from 'react-native';

const _screenDimensions = Dimensions.get('screen');
const _windowDimensions = Dimensions.get('window');

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';

export const SCREEN_WIDTH = _screenDimensions.width;
export const SCREEN_HEIGHT = _screenDimensions.height;
export const WINDOW_HEIGHT = _windowDimensions.height;
