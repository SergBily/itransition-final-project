import { io, Socket } from 'socket.io-client';
import { BASE_URL } from '../../shared';
import { ClientToServerEvents, ServerToClientEvents } from '../../shared/models/socket/socket.model';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  BASE_URL,
  { autoConnect: false },
);

export const openSocket = (itemId: string): void => {
  socket.auth = { itemId };
  socket.connect();
};

export const disconnect = () => {
  socket.disconnect();
};
