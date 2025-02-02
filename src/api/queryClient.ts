import { QueryClient } from '@tanstack/react-query';

import { fetchConfig } from '@config/http';

/**
 * @documentation https://compass-api-dev.enhancers.it/documentation#/
 *
 */
export enum API {
    AUTH_LOGIN = '/auth/login',
    WALLETS = '/wallets',
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            ...fetchConfig,
        },
    },
});

export default queryClient;
