// require modules
const fastify = require('fastify')();
const path = require('path')
const io = require('socket.io')(fastify.server);

// register fastify plugin
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
})
fastify.register(require('fastify-mysql'), {
    connectionString: 'mysql://root@localhost:3308/marioclicker'
})

// register routes
fastify.register(require('./routes/game'), {
});
fastify.register(require('./routes/connect'), {
});

// listen if an user is connected
io.on('connection', function(socket){
    console.log("l'utilisateur est connecté")

    // listen when the user send his log
    socket.on('login', function(username, password){
        if (username && password){
            fastify.mysql.getConnection(onConnect)
        }

        function onConnect(err, client){
            client.query(

                `SELECT userName, id, score  FROM user WHERE password = '${password}' AND userName = '${username}'`,
                function onResult (err, result) {
                    if(result && result.length > 0 ){
                        socket.emit('redirect', "http://localhost:8200/game", result)
                    } else {
                        client.query(

                            `INSERT INTO user (userName, password) VALUES ('${username}', '${password}');`,
                        )
                        client.query(

                            `SELECT userName, id, score  FROM user WHERE password = '${password}' AND userName = '${username}'`,
                            function onResult(err, result){
                                socket.emit('redirect', "http://localhost:8200/game", result)
                            }
                        )
                    }
                }
            )
        }
    })

    // listen when the leaderboard is updating
    socket.on("leaderboard", function(score, id){
        fastify.mysql.getConnection(editScore)

        function editScore(err, client){
            client.query(
                `UPDATE user  SET score = ${score} WHERE user.id = ${id}`,
                function onResult (err, result) {
                    console.log("votre score est mis à jour : " + JSON.stringify(result))
                }
            )

        }
        fastify.mysql.getConnection(showLeaderbord)

        function showLeaderbord(err, client){
            client.query(
                `SELECT score, userName FROM user ORDER BY score DESC LIMIT 10 `,
                function onResult (err, top10) {
                    socket.emit("show leaderboard", top10)
                }
            )
        }
    })
})

// run the server
fastify.listen(8200, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})