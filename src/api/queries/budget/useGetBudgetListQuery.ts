import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { API } from '@api/queryClient';
import { useClient } from '@api/useClient';
import { HttpError } from '@model/error';
import { Budget } from '@model/wallet';
import { getIsLogged } from '@store/modules/auth';

const QUERY_KEY = ['get/budget-list'];

export interface WalletsResponse {
    message: string;
    data: Budget[];
}

const useGetBudgetListQuery = () => {
    const isLogged = useSelector(getIsLogged);
    const fetch = useClient({});

    const { data, isLoading, isError, isRefetching, isFetching, refetch } = useQuery<
        WalletsResponse,
        HttpError
    >({
        queryKey: QUERY_KEY,
        queryFn: () =>
            fetch(`${API.BUDGET}`).then(async (response) => {
                if (response.ok) {
                    return response.json();
                }

                return [];
            }),
        staleTime: 0,
        retry: 3,
        enabled: isLogged,
    });

    return { data, isLoading: isRefetching || isFetching || isLoading, isError, refetch };
};

export { useGetBudgetListQuery, QUERY_KEY as GET_BUDGET_QUERY_KEY };
