import { useMutation } from '@tanstack/react-query';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { WalletExpense } from '@model/wallet';

type CreateExpensePayload = Pick<WalletExpense, 'id' | 'walletId'>;
type CreateExpenseResponse = WalletExpense;

/**
 *
 *
 */
function useDeleteExpenseQuery() {
    const fetch = useClient({});

    const { status, mutate, error, isError, isLoading } = useMutation<
        CreateExpenseResponse,
        HttpError,
        CreateExpensePayload
    >({
        mutationFn: (payload) =>
            fetch(`${API.WALLETS}/${payload.walletId}/expenses/${payload.id}`, {
                method: 'DELETE',
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            }),
    });

    return { deleteExpense: mutate, error, isError, isDeleteExpense: isLoading, status };
}

export default useDeleteExpenseQuery;
