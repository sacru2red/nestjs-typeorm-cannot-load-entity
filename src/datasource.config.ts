import { DATABASE } from './constants/db'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import * as path from 'path'

export const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: (DATABASE) as string,
  synchronize: true,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  migrations: [path.resolve(__dirname, '..', 'typeorm-migration', '*.{ts,js}')],
  entities: [path.resolve(__dirname, 'entity', '*.{ts,js}')],
}

console.log('config', config)
