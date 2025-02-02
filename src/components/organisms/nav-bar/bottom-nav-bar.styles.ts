import colors from '@common/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    bottomTabBarContainer: {},
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.solidMonza,
    },
    fabButton: {
        position: 'absolute',
        right: 20,
        zIndex: 100,
    },
    animatedOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.mercury,
    },
    floatingMenuContainer: {
        position: 'absolute',
        right: 32,
    },
});
