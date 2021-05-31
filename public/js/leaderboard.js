var socket = io();

oldScore = 0
var id = localStorage.getItem('id')

setInterval(() => {
    console.log(" on vérifie le score")
    if (score != oldScore){
        oldScore = score
        socket.emit("leaderboard", score, id)
    }
}, 10000);

// listen to show the leaderboard
socket.on("show leaderboard", function(top10){
    afficheLeaderboard(top10)
})

function afficheLeaderboard(top10Array){
    var html = '';
    var rank = 0;
    top10Array.forEach(user => {
        rank ++
        html += `<li>${rank} ${user["userName"]} : ${user["score"]}</li>`
    });
    document.getElementById("leaderboard").innerHTML = html
}
