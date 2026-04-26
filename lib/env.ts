import 'server-only';

import { z } from 'zod';

const Env = z.object({
  ANDAMIO_API_KEY: z.string().min(1),
  ANDAMIO_GATEWAY_URL: z.string().url(),
  ANDAMIO_NETWORK: z.enum(['preprod', 'mainnet']).default('preprod'),
});

export const env = Env.parse(process.env);

export type Env = z.infer<typeof Env>;
