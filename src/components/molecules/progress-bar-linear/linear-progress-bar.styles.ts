import { StyleSheet } from 'react-native';

import colors from '@common/colors';

export default StyleSheet.create({
    linearProgressBar: { width: '100%' },
    barLine: {
        width: '100%',
        height: 10,
        backgroundColor: colors.solidMonza,
        borderRadius: 4,
    },
    progressLine: {
        position: 'absolute',
        height: 10,
        backgroundColor: colors.mercury,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius: 4,
    },
});
