const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var osu = require('node-os-utils')


const { info } = require('console');




const port = 3000;

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("Connection Opened ");
    socket.on('chat message', msg => {
        console.log("Message Received");
        io.emit('chat message', msg);

    });
});

app.get('/getmsgs', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});

app.get('/spec', (req, res) => {
    var cpu = osu.cpu

    cpu.usage()
        .then(info => {
            console.log(info)
        })
    res.status(200).send("usage");
});

setInterval(function() {
    var cpu = osu.cpu

    cpu.usage()
        .then(info => {
            console.log(info)
        });

}, 2000);

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});