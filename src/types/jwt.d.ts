import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string
      role: 'CLIENT' | 'FREELANCER'
    }
    user: {
      sub: string
      role: 'CLIENT' | 'FREELANCER'
    }
  }
}
