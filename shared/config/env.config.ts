import { z } from "zod";

const envSchema = z.object({
  DB_URL_AUTH: z.string().min(1, "DB_URL_AUTH is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  PORT: z.string().optional(),
});

export const env = envSchema.parse(process.env);
