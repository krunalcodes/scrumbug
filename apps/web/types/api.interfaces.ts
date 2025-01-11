import { AxiosError, AxiosResponse } from "axios";

export interface IApiError extends AxiosError {
  response?: AxiosResponse<{ message: string }>;
}
