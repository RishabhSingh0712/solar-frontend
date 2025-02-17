// socket.js
import { io } from 'socket.io-client';

let socket;

export const initializeSocket = () => {
  console.log('Initializing socket connection...');
  if (!socket || !socket.disconnected) {
    socket = io('https://solar-monitoring-api.onrender.com', {
  
      // transports: ['websocket'],
     
    });
    // console.log('Socket connection established:', socket);
    socket.on('connect', () => console.log(`Connected with ID: ${socket.id}`));
    socket.on('disconnect', () => console.log(`user disconnected`));
    socket.on('error', (error) => console.log('Socket error:', error));
    
    // socket.on('sendInvertersData', (data) => console.log(data));
  }
  return socket;
};
// Get existing socket instance
export const getSocket = () => socket;

// Disconnect the socket
export const disconnectSocket = () => {
  const socketId = socket?.id;
  socket?.disconnect();
  console.log(`User disconnected with ID: ${socketId}`);
  socket = null;
};


