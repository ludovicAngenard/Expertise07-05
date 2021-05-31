var socket = io();
socket.on('redirect', function (url, user){
    window.localStorage.setItem('username', user[0]["userName"]);
    window.localStorage.setItem('id', user[0]["id"]);
    window.localStorage.setItem('score', user[0]["score"]);
    console.log('user:  '+ JSON.stringify(user))
    window.location.href = url;
})

function connect(){
    var username = $('#username')[0].value;
    var password = $('#password')[0].value;
    console.log(username)
    socket.emit('login', username, password)
}