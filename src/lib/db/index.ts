import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { serverEnv } from '../env';

const connectionString = serverEnv().POSTGRES_URL;

// Disable prefetch for serverless environments
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
