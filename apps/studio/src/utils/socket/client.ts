'use client';

import { io } from 'socket.io-client';

export const socket = io(
  process.env.SOCKET_SERVER_URL || 'http://localhost:9000',
);
