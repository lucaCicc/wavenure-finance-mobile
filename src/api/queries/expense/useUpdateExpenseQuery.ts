import { useMutation } from '@tanstack/react-query';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { WalletExpense } from '@model/wallet';

type CreateExpensePayload = WalletExpense;
type CreateExpenseResponse = WalletExpense;

/**
 *
 *
 */
function useUpdateExpenseQuery() {
    const fetch = useClient({});

    const { status, mutate, error, isError, isLoading } = useMutation<
        CreateExpenseResponse,
        HttpError,
        CreateExpensePayload
    >({
        mutationFn: (payload) => {
            const { walletId, id, ...rest } = payload;

            return fetch(`${API.WALLETS}/${payload.walletId}/expenses/${payload.id}`, {
                method: 'PUT',
                body: JSON.stringify(rest),
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            });
        },
    });

    return { updateExpense: mutate, error, isError, isUpdateExpenseLoading: isLoading, status };
}

export default useUpdateExpenseQuery;
