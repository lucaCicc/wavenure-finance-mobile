import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { WalletExpense } from '@model/wallet';
import { getIsLogged } from '@store/modules/auth';

const QUERY_KEY = (walletId: number, filters?: ExpenseFilter) => [
    'get/wallet-espense',
    walletId,
    filters,
];

type ExpenseResponse = {
    message: string;
    data: WalletExpense[];
};

type Conf = {
    enabled?: boolean;
};

export type ExpenseFilter = {
    startDate?: string;
    amount?: string;
    category?: string;
};

/**
 *
 *
 */
const useGetExpenseQuery = (walletId: number, conf: Conf, filters?: ExpenseFilter) => {
    const isLogged = useSelector(getIsLogged);
    const fetch = useClient({});

    const { data, isLoading, isError, isRefetching, isFetching, refetch } = useQuery<
        ExpenseResponse,
        HttpError
    >({
        queryKey: QUERY_KEY(walletId, filters),
        queryFn: () => {
            const queryString =
                filters &&
                Object.entries(filters)
                    .filter(([_, value]) => value)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&');

            console.log('isLogged && conf.enabled', isLogged && conf.enabled);

            return fetch(
                queryString
                    ? `${API.WALLETS}/${walletId}/expenses?${queryString}`
                    : `${API.WALLETS}/${walletId}/expenses`
            ).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            });
        },
        enabled: isLogged && conf.enabled,
    });

    return {
        data,
        isLoading: isRefetching || isFetching || isLoading,
        isError,
        refetch,
    };
};

export { useGetExpenseQuery, QUERY_KEY as GET_EXPENSE_WALLET_QUERY_KEY };
