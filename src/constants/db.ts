import '../utility/applyDotEnv'

export const HOST = process.env.DB_HOST
export const PORT = parseInt(process.env.DB_PORT ?? '3306', 10)
export const USERNAME = process.env.DB_USERNAME
export const PASSWORD = process.env.DB_PASSWORD
export const DATABASE = process.env.DB_DATABASE
