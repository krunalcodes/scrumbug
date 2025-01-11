import { api } from "@/lib/api";
import { IApiError } from "@/types/api.interfaces";
import { ISignupResponse } from "@/types/auth.interfaces";
import { ISignupSchema } from "@/validations/auth-validations";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignup = () =>
  useMutation<ISignupResponse, IApiError, ISignupSchema>({
    mutationFn: (data: ISignupSchema) => api.post(`/v1/auth/register`, data),
    onError: (error) => toast.error(error?.response?.data?.message || ""),
  });
