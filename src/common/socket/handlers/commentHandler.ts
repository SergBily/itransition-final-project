import { newComment } from '../../../redux/features/itemPageSlice';
import { store } from '../../../redux/store';
import CommentRequest from '../../../shared/models/comment/commentRequest';
import CommentResponse from '../../../shared/models/comment/commentResponse';
import { socket } from '../socket';

const sendComment = (m: CommentRequest): void => {
  socket.emit('comment:new', m);
};

socket.on('comment:created', (payload: CommentResponse) => {
  store.dispatch(newComment(payload));
});

export default sendComment;
