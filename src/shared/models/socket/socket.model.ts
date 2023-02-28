import CommentRequest from '../comment/commentRequest';
import CommentResponse from '../comment/commentResponse';

export interface ServerToClientEvents {
  session: (a: SessionData) => void
  'comment:created': (m: CommentResponse) => void;
}

export interface ClientToServerEvents {
  'comment:new': (m: CommentRequest) => void;
}

interface SessionData {
  sessionID: string,
  itemId: string
}
