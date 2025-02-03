import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { WalletExpense } from '@model/wallet';
import { getIsLogged } from '@store/modules/auth';

const QUERY_KEY = (walletId: number) => ['get/wallet-espense', walletId];

type ExpenseResponse = {
    message: string;
    data: WalletExpense[];
};

type Conf = {
    enabled?: boolean;
};
/**
 *
 *
 */
const useGetExpenseQuery = (walletId: number, conf: Conf) => {
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
        staleTime: 0,
        retry: 3,
        enabled: isLogged && conf.enabled,
    });

    return { data, isLoading, isError, isRefetching, isFetching };
};

export { useGetExpenseQuery, QUERY_KEY as GET_EXPENSE_WALLET_QUERY_KEY };
