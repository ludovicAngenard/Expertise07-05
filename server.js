const fastify = require('fastify')({
    logger: true
})

fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
})

// connection à la BDD
fastify.register(require('fastify-mysql'), {
connectionString: 'mysql://root@localhost:3308/marioclicker'
})

// Récupération d'un user dans la BDD grâce à son ID
fastify.get('/user/:id', (req, reply) => {
fastify.mysql.getConnection(onConnect)

    function onConnect (err, client) {
        if (err) return reply.send(err)

        client.query(
        'SELECT id, username, hash, salt FROM users WHERE id=?', [req.params.id],
        function onResult (err, result) {
            client.release()
            reply.send(err || result)
        }
        )
    }
})

fastify.post('/register', function (request, reply) {
    // vérifier les attributs
    console.log(request.body)
    console.log(request.body["userName"])
    // on envoie les données
    fastify.mysql.getConnection(onRegister)
    request.log.info('some info')
    function onRegister (err, client) {
        if (err) return reply.send(err)
        var user = request.body["userName"]
        var password = request.body["password"]
        client.query(
        `INSERT username, password INTO user VALUES(${user}, ${password})`,
        )
    }
  })


fastify.listen(8200, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
    })