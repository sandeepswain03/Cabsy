import { createContext, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket;
}

// Remove the space before the URL
const socket = io("http://localhost:5000", {
    withCredentials: true,
    autoConnect: true,
    transports: ['websocket', 'polling']
});

const SocketContext = createContext<SocketContextType>({
    socket
});

const SocketProvider = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        socket.on('connect_error', (error) => {
            console.error('Connection error:', error);
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketProvider, SocketContext };