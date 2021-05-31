async function connect (fastify, options) {


    console.log('option : ' + JSON.stringify(options))
    fastify.get('/', (req, reply) => {
        reply.code( 200 ).sendFile('connect.html')
    })

}
module.exports = connect