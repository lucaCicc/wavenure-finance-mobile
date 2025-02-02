export interface LoginResponse {
    token: string;
    user: {
        userId: string;
        name: string;
    };
}

export interface LoginRequest {
    email: string;
    password: string;
}
