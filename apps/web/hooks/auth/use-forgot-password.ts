import { api } from "@/lib/api";
import { IApiError } from "@/types/api.interfaces";
import { IForgotPasswordResponse } from "@/types/auth.interfaces";
import { IForgotPasswordSchema } from "@/validations/auth-validations";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useForgotPassword = () =>
  useMutation<IForgotPasswordResponse, IApiError, IForgotPasswordSchema>({
    mutationFn: (data: IForgotPasswordSchema) =>
      api.post(`/v1/auth/forgot-password`, data),
    onError: (error) => toast.error(error?.response?.data?.message || ""),
  });
