enum HTTP_STATUS_CODE {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

enum GenericErrorCode {
    EXPIRED_SESSION = 'ExpiredSession',
}

export enum OTPCheckErrorCode {
    WRONG_OTP = 'WrongOtp',
    OTP_MAX_ATTEMPTS = 'OTP_MAX_ATTEMPTS',
}

enum OTPSendErrorCode {
    UNSUPPORTED_OPERATION = 'UnsupportedOperation',
}

enum LoginErrorCode {
    WRONG_CREDENTIALS = 'WrongCredentials',
    WRONG_PASSWORD = 'WrongPassword',
    MAX_ATTEMPTS = 'MaxAttemptReached',
    USER_BLOCKED = 'USER_BLOCKED',
    PASSWORD_TO_SHORT = 'PasswordTooShort',
    EXPIRED_SESSION = 'ExpiredSession',
    GENERIC_ERROR = 'AuthGenericError',
}

enum OperationChangePaymentErrorCode {
    WRONG_OTP = 'WrongOtp',
    NO_VARIATION = 'NO_VARIATION',
    NOT_VALID = 'NOT_VALID',
    NO_RID_CIRCUIT = 'NO_RID_CIRCUIT',
    USER_NOT_AUTHORIZED = 'USER_NOT_AUTHORIZED',
    PAYMENT_FORM_NOT_EXPECTED = 'PAYMENT_FORM_NOT_EXPECTED',
    ERROR_SERVER = 'InternalServerError',
}

enum OperationCashExpressErrorCode {
    WRONG_OTP = 'WrongOtp',
    BANCA_NON_ABILITATA = 'BANCA_NON_ABILITATA',
    CHECK_DOCUMENT = 'CHECK_DOCUMENT',
}

enum OperationBlockCreditCardErrorCode {
    WRONG_OTP = 'WrongOtp',
    ACTION_NOT_ENABLE = 'ACTION_NOT_ENABLE',
}

const OperationsErrorCode = {
    ...OperationChangePaymentErrorCode,
    ...OperationCashExpressErrorCode,
    ...OperationBlockCreditCardErrorCode,
};

type OperationsErrorCodeType =
    | OperationChangePaymentErrorCode
    | OperationCashExpressErrorCode
    | OperationBlockCreditCardErrorCode;

type ErrorCode =
    | GenericErrorCode
    | LoginErrorCode
    | OperationsErrorCodeType
    | OTPCheckErrorCode
    | OTPSendErrorCode;

interface HttpErrorResponse {
    statusCode: HTTP_STATUS_CODE | 'AbortError';
    timestamp?: number;
    path?: string;
    message?: string;
    errorCode: ErrorCode;
    stack?: string;
}

class HttpError extends Error {
    statusCode: HTTP_STATUS_CODE | 'AbortError';
    errorCode: ErrorCode;

    constructor(error: HttpErrorResponse) {
        super(error.message);
        this.statusCode = error.statusCode;
        this.errorCode = error.errorCode;
    }
}

export {
    OperationsErrorCode,
    HttpError,
    GenericErrorCode,
    LoginErrorCode,
    OperationChangePaymentErrorCode,
    OperationCashExpressErrorCode,
    OperationBlockCreditCardErrorCode,
    HTTP_STATUS_CODE,
};

export type { HttpErrorResponse, ErrorCode, OperationsErrorCodeType };
