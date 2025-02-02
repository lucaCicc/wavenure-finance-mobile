export type AccessToken = string | null | undefined;
export type AccessTokenExpirationEta = number | null | undefined;

export interface AuthState {
    accessToken: AccessToken;
}
