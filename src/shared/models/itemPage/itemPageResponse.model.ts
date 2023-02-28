import CommentResponse from '../comment/commentResponse';
import ItemStructure from '../items/itemStructure.model';
import CollectionResponse from '../newCollection/collectionResponse.model';

interface ItemPageResponse {
  collection: CollectionResponse;
  item: ItemStructure;
  comments: CommentResponse[]
}

export default ItemPageResponse;
