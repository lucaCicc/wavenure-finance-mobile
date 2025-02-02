import { StyleSheet } from 'react-native';

import colors from '@common/colors';

export default StyleSheet.create({
    overlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    drawerContent: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        bottom: 0,
        zIndex: 1000,
    },
    drawerContentWithoutScroll: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        bottom: 0,
        zIndex: 3,
    },
    notchContainer: {
        width: '100%',
        height: 24,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        flexDirection: 'column',
        paddingHorizontal: 16,
    },
    notchBar: {
        alignSelf: 'center',
        width: 36,
        height: 4,
        borderRadius: 100,
        backgroundColor: colors.alto1,
        top: 8,
    },
    titleContainer: {
        width: '100%',
        paddingHorizontal: 16,
        marginBottom: 32,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginEnd: 16,
    },
    stickyHeaderWrapper: {
        backgroundColor: colors.solidWhite,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
});
