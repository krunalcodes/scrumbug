import { env } from "@/env.mjs";
import axios from "axios";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export class CustomError extends CredentialsSignin {
  code = "custom";
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions);
    this.code = message;
  }
}

export const nextAuth = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: { type: "email", name: "email" },
        password: { type: "password", name: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${env.NEXT_PUBLIC_API_URL}/v1/auth/login`,
            credentials,
          );
          return res.data.user;
        } catch (e) {
          if (axios.isAxiosError(e)) {
            throw new CustomError(
              e?.response?.data?.message || "Invalid credentials",
            );
          }
          return null;
        }
      },
    }),
  ],
});
