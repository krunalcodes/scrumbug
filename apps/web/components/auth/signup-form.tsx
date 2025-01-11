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
import { ISignupSchema, signupSchema } from "@/validations/auth-validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { useSignup } from "@/hooks/auth/use-signup";
import { ImSpinner8 } from "react-icons/im";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignupForm = () => {
  const form = useForm<ISignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useSignup();
  const router = useRouter();

  const handleSignup = async (values: ISignupSchema) =>
    mutate(values, {
      onSuccess: (res) => {
        router.push("/login");
        toast.success(res.data.message || "");
      },
    });

  return (
    <div className="mt-4">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSignup)}>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <p className="text-xs text-muted-foreground font-medium text-center">
            By signing up, I accept the Scrumbug{" "}
            <Link href="/" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and acknowledge the{" "}
            <Link href="/" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <Button className="w-full" disabled={isPending}>
            {isPending ? (
              <ImSpinner8 className="animate-spin h-5 w-5" />
            ) : (
              <span>Sign up</span>
            )}
          </Button>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
