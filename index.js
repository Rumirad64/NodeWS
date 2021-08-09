const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const os = require('os');
var osu = require('node-os-utils');
const { info } = require('console');

const port = 3000;

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/templates/index.html');
});

io.on('connection', (socket) => {
    var add = socket.handshake.address.substring(7);
    console.log("Connection Opened -> " + add);

    io.emit('chat message', "Client connected from -> " + add);

    socket.on('chat message', msg => {
        console.log("Message Received");
        var address = socket.handshake.address.substring(7);
        io.emit('chat message', address + " -> " + msg);
    });

    socket.on('request usage', msg => {
        console.log("Requesting Usage");
        var address = socket.handshake.address.substring(7);
        //io.emit('response usage', "10");
    });
});

app.get('/data', (req, res) => {

    res.sendFile(__dirname + '/templates/data.html');
});

app.get('/static/:filename', (req, res) => { //serving static files

    res.sendFile(__dirname + '/static/' + req.params.filename);
});

setInterval(function() {
    let cpu = osu.cpu;
    let cpuCount = os.cpus().length;

    let totmem = os.totalmem();
    totmem = totmem / 1.074 / Math.pow(10, 9);
    totmem = totmem.toFixed(2);

    let freemem = os.freemem();
    let usedmem = totmem - freemem / 1.074 / Math.pow(10, 9);
    usedmem = usedmem.toFixed(2);

    cpu.usage()
        .then(cpuusage => {
            let response = {
                "LogicalProcessors": cpuCount,
                "CPUUsage": cpuusage,
                "TotalMemory": totmem,
                "UsedMemory": usedmem
            };
            io.emit('response usage', response);
            console.log(response);

        });
}, 1000);

http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});