import NewItemRequest from './newItemRequest.model';

interface ItemEditRequest {
  itemId: string,
  payload: NewItemRequest
}

export default ItemEditRequest;
