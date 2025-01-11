"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IResetPasswordSchema,
  resetPasswordSchema,
} from "@/validations/auth-validations";
import { Button } from "@/components/ui/button";
import { ImSpinner8 } from "react-icons/im";
import { PasswordInput } from "@/components/ui/password-input";
import { useResetPassword } from "@/hooks/auth/use-reset-password";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const { token }: { token: string } = useParams();
  const form = useForm<IResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      token,
    },
  });

  const { mutate, isPending } = useResetPassword();

  const router = useRouter();

  const handleResetPassword = async (values: IResetPasswordSchema) =>
    mutate(values, {
      onSuccess: (res) => {
        router.push("/login");
        toast.success(res.data.message);
      },
    });

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleResetPassword)}
        >
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isPending}>
            {isPending ? (
              <ImSpinner8 className="animate-spin h-5 w-5" />
            ) : (
              <span>Continue</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
