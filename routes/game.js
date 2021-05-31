async function game (fastify, options) {

    fastify.get('/game', function (request, reply) {
        return reply.code( 200 ).sendFile('index.html')
    })
}
module.exports = game

