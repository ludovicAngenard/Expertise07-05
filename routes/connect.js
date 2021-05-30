async function connect (fastify, options) {
    

    console.log('option : ' + JSON.stringify(options))
    fastify.get('/', (req, reply) => {
        reply.sendFile('connect.html')
    })


    // fastify.get('/user/:id', (req, reply) => {
    //     fastify.mysql.getConnection(onConnect)
    //     function onConnect (err, client) {
    //         if (err) return reply.send(err)

    //         client.query(
    //         'SELECT id, username, hash, salt FROM users WHERE id=?', [req.params.id],
    //         function onResult (err, result) {
    //             client.release()
    //             reply.send(err || result)
    //         })
    //     }
    // })

    fastify.post('/register', function (request, reply) {
        // vérifier les attributs
        console.log(request.body)
        console.log(request.body["userName"])
        // on envoie les données
        fastify.mysql.getConnection(onRegister)
        request.log.info('some info')
        function onRegister (err, client) {
            if (err) return reply.send(err)
            var userName = request.body["userName"]
            var password = request.body["password"]
            client.query(
                `INSERT INTO user (userName, password) VALUES ('${userName}', '${password}');`,
            )
        }
        gamereply.code( 200 ).send('game');
    })
}
module.exports = connect