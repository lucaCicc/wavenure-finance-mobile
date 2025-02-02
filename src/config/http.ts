import type { QueryObserverOptions } from '@tanstack/react-query';

export const CACHE_TIMES_INFINITE = Infinity;
export const CACHE_TIMES_1_MINUTES = 60000; // 1 minutes
export const CACHE_TIMES_5_MINUTES = 300000; // 5 minutes
export const CACHE_TIMES_10_MINUTES = 600000; // 10 minutes
export const CACHE_TIMES_15_MINUTES = 900000; // 15 minutes
export const CACHE_TIMES_30_MINUTES = 1800000; // 30 minutes

export const fetchConfig: QueryObserverOptions = {
    retry: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: true,
};

export const defaultHeaders = {
    'Content-Type': 'application/json',
};

export const API_URL = `${'http://192.168.178.47:3000/api'}/${'v1'}`;
