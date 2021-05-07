const fastify = require('fastify')({ logger: true })
const world = 'world'
const PORT = process.env.PORT || 8000
fastify.register(require('fastify-socket.io'),{
    
})
// Declare a root
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

// Run the server !
const start = async () => {
    try {
        await fastify.listen(8000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()