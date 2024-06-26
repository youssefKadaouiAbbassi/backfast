'use client';

import { io } from 'socket.io-client';

export const useSocket = () => {
  console.log('useSocket', {
    NEXT_PUBLIC_SOCKET_SERVER_URL: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL,
  });
  return io(
    process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || 'http://localhost:9000',
  );
};
