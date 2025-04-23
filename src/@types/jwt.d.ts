import '@fastify/jwt'
import { UserPayload } from '../@types'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
    payload: UserPayload
  }
}
