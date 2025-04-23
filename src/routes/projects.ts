import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { onlyRole } from '../plugins/auth'
import { UserPayload } from '../@types'

export async function projectRoutes(app: FastifyInstance) {
    app.post('/projects', { preHandler: [onlyRole('CLIENT')] }, async (request, reply) => {
        const { title, description, price, deadline } = request.body as {
            title: string
            description: string
            price: number
            deadline: string
        }

        const user = request.user as UserPayload

        const project = await prisma.project.create({
            data: {
                title,
                description,
                price,
                deadline: new Date(deadline),
                clientId: user.sub,
            }
        })

        return reply.status(201).send({ project })
    })
}
