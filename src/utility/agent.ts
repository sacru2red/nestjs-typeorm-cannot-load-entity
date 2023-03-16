import { Request } from 'express'

export const getAgent = (request: Request) => {
  return request.headers['user-agent'] ?? 'not detected'
}
