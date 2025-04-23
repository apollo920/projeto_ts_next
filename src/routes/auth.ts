import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import { verifyJWT } from '../plugins/auth'
import { UserPayload } from '../@types'

export async function authRoutes(app: FastifyInstance) {
  app.post('/signup', async (request, reply) => {
    const { name, email, password, role } = request.body as {
      name: string
      email: string
      password: string
      role: 'CLIENT' | 'FREELANCER'
    }

    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return reply.status(400).send({ message: 'Usuário já existe.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    const token = app.jwt.sign({ sub: user.id, role: user.role })

    return reply.send({ token })
  })

  app.post('/login', async (request, reply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return reply.status(400).send({ message: 'Usuário não encontrado.' })
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return reply.status(400).send({ message: 'Senha incorreta.' })
    }

    const token = app.jwt.sign({ sub: user.id, role: user.role })

    return reply.send({ token })
  })

  app.get('/me', { preHandler: [verifyJWT] }, async (request, reply) => {
    const user = request.user as UserPayload
    const userId = user.sub
  
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
  
    if (!userData) {
      return reply.status(404).send({ message: 'Usuário não encontrado.' })
    }
  
    return { user: userData }
  })
}
