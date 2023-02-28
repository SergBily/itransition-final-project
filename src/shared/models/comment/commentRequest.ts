interface CommentRequest {
  userId: string;
  collectionId: string;
  itemId: string;
  text: string;
  sender: string;
}

export default CommentRequest;
