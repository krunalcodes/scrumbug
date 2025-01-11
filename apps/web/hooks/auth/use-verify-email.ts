import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useVerifyEmail = (token: string) =>
  useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => api.post(`/v1/auth/verify-email`, { token }),
    retry: false,
  });
