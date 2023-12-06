import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });


 export default {
   schema: 'src/lib/entities/index.ts',
   driver: 'better-sqlite',
   dbCredentials: {
		url: 'db/main.db'
	},
   out: '.drizzle'
 } satisfies Config;