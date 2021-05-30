async function game (fastify, options) {
    fastify.get('/game', function (request, reply) {
        return reply.sendFile('index.html')
    })
}
module.exports = game

