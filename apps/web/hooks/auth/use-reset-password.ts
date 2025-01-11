import { api } from "@/lib/api";
import { IApiError } from "@/types/api.interfaces";
import { IResetPasswordResponse } from "@/types/auth.interfaces";
import { IResetPasswordSchema } from "@/validations/auth-validations";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useResetPassword = () =>
  useMutation<IResetPasswordResponse, IApiError, IResetPasswordSchema>({
    mutationFn: (data: IResetPasswordSchema) =>
      api.post(`/v1/auth/reset-password`, data),
    onError: (error) => toast.error(error?.response?.data?.message || ""),
  });
