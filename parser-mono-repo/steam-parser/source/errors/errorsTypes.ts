/**
 * @description Enum for error type, we use it to determine what error we got by constructor.name 
 * so error types must be equal to constructor.name of error
 * @enum {string}
 */
export enum ErrorTypes {
    TooManyRequestsError = "TooManyRequestsError",
}