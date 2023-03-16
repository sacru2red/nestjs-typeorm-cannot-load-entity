import { config } from './src/datasource.config'
import { DataSource } from 'typeorm'

const applyConfig = config
const datasource = new DataSource(applyConfig)
void datasource.initialize()

console.log('applyConfig', applyConfig)

export default datasource
