import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { CACHE_TIMES_5_MINUTES } from '@config/http';
import { HttpError } from '@model/error';
import { WalletExpense } from '@model/wallet';
import { getIsLogged } from '@store/modules/auth';

const QUERY_KEY = (walletId: number) => ['get/wallet-espense', walletId];

type ExpenseResponse = {
    message: string;
    data: WalletExpense[];
};

/**
 *
 *
 */
const useGetExpenseQuery = (walletId: number) => {
    const isLogged = useSelector(getIsLogged);
    const fetch = useClient({});

    const { data, isLoading, isError, isRefetching, isFetching } = useQuery<
        ExpenseResponse,
        HttpError
    >({
        queryKey: QUERY_KEY(walletId),
        queryFn: () =>
            fetch(`${API.WALLETS}/${walletId}/expenses`).then(async (response) => {
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

export { useGetExpenseQuery, QUERY_KEY as GET_WALLETS_QUERY_KEY };
