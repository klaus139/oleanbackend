import {Socket} from 'socket.io';

export const SocketServer = (socket: Socket) => {
    socket.on('joinRoom', (slug: string) =>{
        socket.join(slug)
        console.log({joinRoom: (socket as any).adapter.rooms})
    })
    socket.on('outRoom', (slug: string) => {
        socket.leave(slug)
        // console.log({outRoom: (socket as any).adapter.rooms})
    })
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected')
    })
}