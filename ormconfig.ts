import { DataSource } from 'typeorm'

export const connection = new DataSource({
  migrationsTableName: 'migrations',
  type: 'sqlite',
  database: 'src/database/golden-raspberry-awards.db',
  logging: false,
  synchronize: false,
  entities: ['src/models/**.ts'],
  migrations: ['src/database/migrations/*{.ts,.js}']
})
