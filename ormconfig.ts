import dotenv from 'dotenv'
import { DataSource } from 'typeorm'

const environment = process.env.NODE_ENV
const envFile = `.env.${environment}`

dotenv.config({ path: envFile })

export const connection = new DataSource({
  migrationsTableName: 'migrations',
  type: 'sqlite',
  database: process.env.TYPEORM_DATABASE ?? 'database/db/golden-raspberry-awards.db',
  logging: false,
  synchronize: false,
  entities: [
    process.env.NODE_ENV === 'prod'
      ? 'dist/infra/entities/**.js'
      : 'src/infra/entities/**.ts'
  ],
  migrations: [
    process.env.NODE_ENV === 'prod'
      ? 'dist/infra/database/migrations/*.js'
      : 'src/infra/database/migrations/*.ts'
  ]
})
