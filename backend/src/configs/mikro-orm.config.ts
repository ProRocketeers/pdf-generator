import { defineConfig } from '@mikro-orm/postgresql'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import * as dotenv from 'dotenv'

dotenv.config()

const sslEnabledValues = new Set(['true', '1', 'yes', 'on'])
const sslRequiredModes = new Set(['require', 'verify-ca', 'verify-full'])

const isSslEnabled =
  sslEnabledValues.has(process.env.DB_SSL?.toLowerCase() ?? '') ||
  sslRequiredModes.has(process.env.DB_SSL_MODE?.toLowerCase() ?? '')

export default defineConfig({
  metadataProvider: TsMorphMetadataProvider,
  entities: ['./dist/**/**/*.entity.js'],
  entitiesTs: ['./src/**/**/*.entity.ts'],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  driverOptions: isSslEnabled
    ? { connection: { ssl: { rejectUnauthorized: false } } }
    : {},
  migrations: {
    path: 'db/migrations',
    pathTs: 'db/migrations',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
  seeder: {
    path: 'db/seeders',
    pathTs: 'db/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },
})
