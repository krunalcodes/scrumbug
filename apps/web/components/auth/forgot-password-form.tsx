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
  forgotPasswordSchema,
  IForgotPasswordSchema,
} from "@/validations/auth-validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ImSpinner8 } from "react-icons/im";
import { useState } from "react";
import { useForgotPassword } from "@/hooks/auth/use-forgot-password";
import { RiMailSendLine } from "react-icons/ri";

const ForgotPasswordForm = () => {
  const [isSent, setIsSent] = useState<boolean>(false);
  const form = useForm<IForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useForgotPassword();

  const handleForgotPassword = async (values: IForgotPasswordSchema) =>
    mutate(values, {
      onSuccess: () => {
        setIsSent(true);
      },
    });

  if (isSent) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center space-y-2">
        <RiMailSendLine className="h-16 w-16" />
        <p className="text-muted-foreground">
          We sent a recovery link to you at
        </p>
        <p className="font-semibold">{form.getValues("email")}</p>
        <p className="text-xs text-muted-foreground">
          If you haven't received the email, check your spam folder.
        </p>
        <p className="text-center">
          <Link href="/login" className="text-primary hover:underline">
            Return to login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleForgotPassword)}
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isPending}>
            {isPending ? (
              <ImSpinner8 className="animate-spin h-5 w-5" />
            ) : (
              <span>Send recovery link</span>
            )}
          </Button>
          <p className="text-center">
            <Link href="/login" className="text-primary hover:underline">
              Return to login
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
