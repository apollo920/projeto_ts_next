import Fastify from "fastify";

const app = Fastify()

app.get('/', async () => {
    return {hello: 'world'}
})

app.listen({port:3333}, () => {
    console.log('Backend rodando em http://localhost:3333')
})