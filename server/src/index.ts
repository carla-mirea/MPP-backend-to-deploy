import http from 'http';
import { Server } from 'socket.io';
import { Monitor } from './model/monitor';
import { createMonitor, monitors } from './dataStore';

const app = require('./app');

const server = http.createServer(app);
const io = new Server(server);


io.on('connection', (socket) => {
    setInterval(() => {
        const monitor: Monitor = createMonitor();
        monitors.push(monitor);
        socket.emit('newMonitor', monitor);
    }, 7000000);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/api`);
});