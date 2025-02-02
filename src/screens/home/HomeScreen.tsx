import { SafeAreaView } from 'react-native-safe-area-context';

import WalletsEmptyContainer from '@/container/wallets-empty-container/WalletsEmptyContainer';
import { useGetWalletsQuery } from '@api/queries/wallet/useGetWalletsQuery';
import colors from '@common/colors';

/**
 *
 *
 */
const HomeScreen = () => {
    const { data } = useGetWalletsQuery();

    console.log('data-ciao', data?.data);

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
