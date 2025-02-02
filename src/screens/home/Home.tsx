import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WalletsEmptyContainer from '@/container/wallets-empty-container/WalletsEmptyContainer';
import { useGetWallets } from '@api/queries/wallet/useGetWallets';
import colors from '@common/colors';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';

/**
 *
 *
 */
const HomeScreen = () => {
    const { data } = useGetWallets();

    console.log('data', data?.data.wallets.length);

    return (
        <SafeAreaView
            style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                flex: 1,
                backgroundColor: colors.pampas,
            }}>
            <WalletsEmptyContainer />
        </SafeAreaView>
    );
};

export default HomeScreen;
