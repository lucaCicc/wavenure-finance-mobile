import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { Wallet } from '@model/wallet';
import { getIsLogged } from '@store/modules/auth';

const QUERY_KEY = ['get/wallet-list'];

export interface WalletsResponse {
    message: string;
    data: {
        count: number;
        wallets: Wallet[];
    };
}

const useGetWalletsQuery = () => {
    const isLogged = useSelector(getIsLogged);
    const fetch = useClient({});

    const { data, isLoading, isError, isRefetching, isFetching } = useQuery<
        WalletsResponse,
        HttpError
    >({
        queryKey: QUERY_KEY,
        queryFn: () =>
            fetch(`${API.WALLETS}`).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }

                return [];
            }),
        staleTime: 0,
        retry: 3,
        enabled: isLogged,
        onError: (error) => {
            // Qui puoi anche fare una gestione dell'errore, loggare ecc.
            console.error('Error fetching wallets:', error);
        },
        initialData: () => undefined,
    });

    return { data, isLoading: isRefetching || isFetching || isLoading, isError };
};

export { useGetWalletsQuery, QUERY_KEY as GET_WALLETS_QUERY_KEY };
