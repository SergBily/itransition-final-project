import CollectionResponse from '../newCollection/collectionResponse.model';
import ItemStructure from './itemStructure.model';

interface ItemsCollectionResponse {
  collection: CollectionResponse
  items: ItemStructure[]
}

export default ItemsCollectionResponse;
