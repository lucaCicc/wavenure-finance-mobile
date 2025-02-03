import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import queryClient from '@api/queryClient';
import colors from '@common/colors';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import { setAccessToken } from '@store/modules/auth';

const OthersScreen = () => {
    const dispatch = useDispatch();

    return (
        <SafeAreaView>
            <ConfirmButton
                onPress={() => {
                    dispatch(setAccessToken(null));
                    queryClient.clear();
                    queryClient.invalidateQueries();
                }}
                style={{ backgroundColor: colors.milanoRed2 }}
                title="Logout"></ConfirmButton>
        </SafeAreaView>
    );
};

export default OthersScreen;
