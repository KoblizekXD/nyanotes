import { config } from "dotenv";
import { z } from "zod";

config({ path: ".env.local" });

const env = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.optional(z.string().default(process.env.NODE_ENV)),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
});

export default env.parse(process.env);
