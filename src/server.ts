import Fastify from 'fastify'
import jwtPlugin from './plugins/jwt'
import { authRoutes } from './routes/auth'

const app = Fastify()

app.register(jwtPlugin)
app.register(authRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }, () => {
  console.log('🚀 Server rodando em http://localhost:3333')
})
