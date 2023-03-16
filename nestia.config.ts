import type nestia from '@nestia/sdk'

export const NESTIA_CONFIG: nestia.INestiaConfig = {
  input: './src/**/*.controller.ts',
  output: './src/api',
  json: true,
  swagger: {
    output: './swagger/swagger.yaml',
    yaml: true,
  },
  compilerOptions: {
    rootDir: '.',
  },
}
export default NESTIA_CONFIG
