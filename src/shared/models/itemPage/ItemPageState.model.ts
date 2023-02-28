import CommentResponse from '../comment/commentResponse';
import ItemStructure from '../items/itemStructure.model';
import CollectionResponse from '../newCollection/collectionResponse.model';
import InitialState from '../state/initialState.model';

interface ItemPageState extends InitialState {
  item: ItemStructure | null;
  collection: CollectionResponse | null;
  errors: string[];
  comments: CommentResponse[];
}

export default ItemPageState;
