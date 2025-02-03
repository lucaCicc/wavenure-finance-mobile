import { useMutation } from '@tanstack/react-query';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { WalletExpense } from '@model/wallet';

type CreateExpensePayload = Omit<WalletExpense, 'id'>;
type CreateExpenseResponse = WalletExpense;

/**
 *
 *
 */
function useCreateExpenseQuery() {
    const fetch = useClient({});

    const { status, mutate, error, isError, isLoading } = useMutation<
        CreateExpenseResponse,
        HttpError,
        CreateExpensePayload
    >({
        mutationFn: (payload) =>
            fetch(`${API.WALLETS}/${payload.walletId}/expenses`, {
                method: 'POST',
                body: JSON.stringify(payload),
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            }),
    });

    return { creteExpense: mutate, error, isError, isQueryLoading: isLoading, status };
}

export default useCreateExpenseQuery;
