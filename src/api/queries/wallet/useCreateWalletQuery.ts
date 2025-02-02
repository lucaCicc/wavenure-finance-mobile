import { useMutation } from '@tanstack/react-query';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { Wallet } from '@model/wallet';

interface WalletRequest {
    name: string;
    initialBalance: number;
    currency: string;
}

export interface WalletResponse {
    message: string;
    data: Wallet;
}

/**
 *
 *
 */
function useCreateWalletQuery() {
    const fetch = useClient({});

    const { status, mutate, error, isError, isLoading } = useMutation<
        WalletResponse,
        HttpError,
        WalletRequest
    >({
        mutationFn: (payload: WalletRequest) =>
            fetch(API.WALLETS, {
                method: 'POST',
                body: JSON.stringify(payload),
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            }),
    });

    return { creteWallet: mutate, error, isError, isQueryLoading: isLoading, status };
}

export default useCreateWalletQuery;
