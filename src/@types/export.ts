export interface AdminJwtUser {
  username: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      username: string
    }
  }
}
