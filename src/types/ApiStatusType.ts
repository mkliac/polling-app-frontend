export enum APIStatus {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export type APIStatusType = APIStatus.IDLE | APIStatus.LOADING | APIStatus.SUCCESS | APIStatus.ERROR;

export type RequestError = {
    message: string
};