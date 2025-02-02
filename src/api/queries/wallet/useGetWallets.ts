import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { CACHE_TIMES_5_MINUTES } from '@config/http';
import { HttpError } from '@model/error';
import { getIsLogged } from '@store/modules/auth';

const QUERY_KEY = () => ['client/address'];

type Wallets = {
    id: number;
    name: string;
    initialBalance: number;
    currency: string;
    userId: number;
};

type WalletsResponse = {
    message: string;
    data: {
        count: number;
        wallets: Wallets[];
    };
};

const useGetWallets = () => {
    const isLogged = useSelector(getIsLogged);
    const fetch = useClient({});

    const { data, isLoading, isError, isRefetching, isFetching } = useQuery<
        WalletsResponse,
        HttpError
    >({
        queryKey: QUERY_KEY(),
        queryFn: () =>
            fetch(`${API.WALLET_LIST}`).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            }),
        cacheTime: CACHE_TIMES_5_MINUTES,
        staleTime: 0,
        retry: 3,
        enabled: isLogged,
    });

    return { data, isLoading, isError, isRefetching, isFetching };
};

export { useGetWallets };
