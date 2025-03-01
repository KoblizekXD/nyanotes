import { z } from "zod";

export const env = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
});

export default env.parse(process.env);
