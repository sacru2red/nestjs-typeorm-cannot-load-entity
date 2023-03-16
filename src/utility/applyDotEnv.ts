import * as dotenv from 'dotenv'
import * as path from 'path'

const filename = process.env.NODE_ENV === 'prod' ? '.prod.env' : '.dev.env'
/**
 * /dist/src/utility/applyDotEnv => /{filename}
 */
const dotEnvPath = path.resolve(__dirname, '..', '..', '..', filename)
dotenv.config({ path: dotEnvPath })
