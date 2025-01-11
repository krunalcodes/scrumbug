import { env } from "@/env.mjs";
import axios from "axios";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});
