'use client';

import { io } from 'socket.io-client';

export const useSocket = () => {
  console.log('useSocket', {
    NEXT_PUBLIC_SOCKET_SERVER_URL: `http://localhost:${process.env.NODE_ENV === 'development' ? 9000 : 9001}`,
  });
  return io(
    `http://localhost:${process.env.NODE_ENV === 'development' ? 9000 : 9001}`,
  );
};
