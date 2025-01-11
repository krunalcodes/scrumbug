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
import { ILoginSchema, loginSchema } from "@/validations/auth-validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<ILoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = async (values: ILoginSchema) => {
    setIsPending(true);
    await signIn("credentials", { ...values, redirect: false }).then((res) => {
      setIsPending(false);
      if (!res) {
        toast.error("Something went wrong!!");
        return;
      }
      if (res.error) {
        toast.error(res.code || "Something went wrong!!");
        return;
      }
      router.push("/");
    });
  };

  return (
    <div className="mt-4">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleLogin)}>
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
              <span>Log in</span>
            )}
          </Button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
