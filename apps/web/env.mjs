import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
  },
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
