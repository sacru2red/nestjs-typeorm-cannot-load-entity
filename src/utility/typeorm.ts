import { InsertResult } from 'typeorm'

export const getIdFromInsertResult = (result: InsertResult) => {
  const mysqlType = result.raw.insertId
  const mariadDBType = result.identifiers?.[0]?.id
  return mysqlType ?? mariadDBType as number
}
