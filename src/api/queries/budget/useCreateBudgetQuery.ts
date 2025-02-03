import { useMutation } from '@tanstack/react-query';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { Budget } from '@model/wallet';

type BudgetRequest = Omit<Budget, 'id' | 'userId' | 'currency'>;
type WalletResponse = Budget;

/**
 *
 *
 */
function useCreateBudget() {
    const fetch = useClient({});

    const { status, mutate, error, isError, isLoading } = useMutation<
        WalletResponse,
        HttpError,
        BudgetRequest
    >({
        mutationFn: (payload) =>
            fetch(API.BUDGET, {
                method: 'POST',
                body: JSON.stringify(payload),
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            }),
    });

    return { creteBudget: mutate, error, isError, isQueryLoading: isLoading, status };
}

export default useCreateBudget;
