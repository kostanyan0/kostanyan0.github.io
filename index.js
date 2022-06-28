const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(3000);

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


connections = [];

io.sockets.on('connection', function (socket) {
    console.log('Հաջող կապ');
    // Добавление нового соединения в массив
    connections.push(socket);

    // Функция, которая срабатывает при отключении от сервера
    socket.on('disconnect', function (data) {
        // Удаления пользователя из массива
        connections.splice(connections.indexOf(socket), 1);
        console.log('Անջատել');
    });

    // Внутри функции мы передаем событие 'add mess',
	// которое будет вызвано у всех пользователей и у них добавиться новое сообщение
    socket.on('send mess', function (data) {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className });
    });
});
