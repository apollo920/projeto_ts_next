import Fastify from 'fastify'
import jwtPlugin from './plugins/jwt'
import { authRoutes } from './routes/auth'
import { projectRoutes } from './routes/projects'

const app = Fastify()

app.register(jwtPlugin)
app.register(authRoutes)
app.register(projectRoutes)
app.register(projectRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }, () => {
  console.log('Server rodando em http://localhost:3333')
})
