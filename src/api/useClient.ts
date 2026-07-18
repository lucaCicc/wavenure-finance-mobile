import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import queryClient, { API } from '@api/queryClient';
import { API_URL, defaultHeaders } from '@config/http';
import Logger from '@helper/logger';
import { GenericErrorCode, HTTP_STATUS_CODE, HttpError, HttpErrorResponse } from '@model/error';
import { getAccessToken, setAccessToken } from '@store/modules/auth';

type Props = {
    skipCheckToken?: boolean;
};

type Endpoint = `${API}` | `${API}/${string}` | `${API}&${string}` | `${API}?${string}`;

type ClientResponse = {
    ok: boolean;
    status: number;
    json: () => Promise<any>;
};

/**
 *
 *
 */
export function useClient({ skipCheckToken = false }: Props) {
    const accessToken = useSelector(getAccessToken);
    const dispatch = useDispatch();

    const expireSessions = useCallback(() => {
        dispatch(setAccessToken(null));
        queryClient.clear();
        queryClient.invalidateQueries();
    }, [dispatch]);

    const makeRequest = useCallback(
        async (endpoint: Endpoint, init?: any): Promise<ClientResponse> => {
            const normalizedInit = {
                ...init,
                headers: {
                    ...defaultHeaders,
                    ...{ Authorization: accessToken },
                    ...init?.headers,
                },
            };
            Logger.debug({
                file: 'useClient.ts',
                message: `[Request] ${API_URL}${endpoint} ${JSON.stringify(normalizedInit)}`,
            });

            const { method, headers, body } = normalizedInit;

            const response = await axios.request({
                url: `${API_URL}${endpoint}`,
                method,
                headers,
                data: body,
                validateStatus: () => true,
            });

            return {
                ok: response.status >= 200 && response.status < 300,
                status: response.status,
                json: async () => response.data,
            };
        },
        [accessToken]
    );

    return async (endpoint: Endpoint, init?: any) => {
        if (!accessToken && !skipCheckToken) {
            expireSessions();

            return Promise.reject(
                new HttpError({
                    statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
                    errorCode: GenericErrorCode.EXPIRED_SESSION,
                })
            );
        }

        return makeRequest(endpoint, init)
            .then(async (response) => {
                Logger.debug({
                    file: 'useClient.ts',
                    message: `[Response status] ${endpoint} ${response.status}`,
                });
                if (response.status === HTTP_STATUS_CODE.FORBIDDEN) {
                    // expireSessions();

                    const errorResponse: HttpErrorResponse = await response.json();

                    Logger.error({
                        file: 'useClient.ts',
                        functionName: 'makeRequest error 1',
                        message: JSON.stringify(errorResponse),
                    });

                    return Promise.reject(new HttpError(errorResponse));
                }
                if (response.ok) {
                    return response;
                } else {
                    const errorResponse: HttpErrorResponse = await response.json();

                    Logger.error({
                        file: 'useClient.ts',
                        functionName: 'makeRequest error 2 ',
                        message: JSON.stringify(errorResponse),
                    });

                    return Promise.reject(new HttpError(errorResponse));
                }
            })
            .catch((error) => {
                Logger.error(
                    {
                        file: 'useClient.ts',
                        functionName: 'makeRequest error 3',
                    },
                    error
                );

                return Promise.reject(new HttpError(error));
            });
    };
}
