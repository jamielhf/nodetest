/**
 * Created by Administrator on 2017/3/23.
 */


var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3003);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {

    socket.on('chat', function (data) {
        io.emit('msg', data);
    });
    socket.on('drawStart', function (data) {
        io.emit('clientStartDraw', data);
    });
     socket.on('clearing', function (data) {
        io.emit('clientClearing', data);
    });
      socket.on('clearAll', function (data) {
        io.emit('clientClearAll', data);
    });
    socket.on('drawing', function (data) {
        io.emit('clientDrawing', data);
    });


});
