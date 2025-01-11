import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[\W_]/, {
      message:
        "Password must contain at least one special character (e.g., !, @, #, $, etc.).",
    }),
});

export type ISignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z.string(),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
