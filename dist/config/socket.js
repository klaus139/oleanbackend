"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const SocketServer = (socket) => {
    socket.on('joinRoom', (slug) => {
        socket.join(slug);
        console.log({ joinRoom: socket.adapter.rooms });
    });
    socket.on('outRoom', (slug) => {
        socket.leave(slug);
        // console.log({outRoom: (socket as any).adapter.rooms})
    });
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
};
exports.SocketServer = SocketServer;
