import { useMutation } from '@tanstack/react-query';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { LoginRequest, LoginResponse } from '@model/auth';
import { HttpError } from '@model/error';

/**
 *
 *
 */
function useLoginQuery() {
    const fetch = useClient({ skipCheckToken: true });

    const { status, mutate, error, isError, isLoading } = useMutation<
        LoginResponse,
        HttpError,
        LoginRequest
    >({
        mutationFn: ({ email, password }: LoginRequest) =>
            fetch(API.AUTH_LOGIN, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            }).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new HttpError(await response.json());
            }),
    });

    return { login: mutate, error, isError, isQueryLoading: isLoading, status };
}

export default useLoginQuery;
