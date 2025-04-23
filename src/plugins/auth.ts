import { FastifyRequest, FastifyReply } from 'fastify'
import { UserPayload } from '../@types'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch (err) {
        return reply.status(401).send({ message: 'Token inválido ou ausente '})
    }
}

export function onlyRole(role: 'CLIENT' | 'FREELANCER') {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        await request.jwtVerify()
        const user = request.user as UserPayload
        if (user.role !== role) {
            return reply.status(401).send({message: 'Apenas usuários com role ' + role + ' podem acessar este recurso'})
        }
    }
}