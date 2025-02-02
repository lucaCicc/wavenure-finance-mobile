import { StyleSheet } from 'react-native';

import colors from '@common/colors';

export default StyleSheet.create({
    bottomTabBar: {
        width: '100%',
        backgroundColor: colors.solidWhite,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        // shadowOpacity: 0.2,
        // shadowRadius: 20.0,
        // elevation: 0,
    },
    androidShadowWrapper: {
        ...StyleSheet.absoluteFillObject,
        elevation: 0,
    },
    androidShadow: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.transparent,
        elevation: 30,
        transform: [{ translateY: -10 }],
    },
    tabsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: colors.solidWhite,
    },
    tab: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        paddingBottom: 12,
    },
    icon: {
        width: 24,
        color: colors.solidMineShaft,
    },
    iconSelected: {
        color: colors.solidMonza,
    },
    text: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
        marginTop: 4,
    },
    rowLine: {
        backgroundColor: colors.mercury,
        height: 2,
        marginBottom: 15,
    },
    pointer: {
        marginBottom: 5,
    },
});
