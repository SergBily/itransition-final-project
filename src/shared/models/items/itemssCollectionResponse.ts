import CollectionResponse from '../newCollection/collectionResponse';
import ItemStructure from './itemStructure';

interface ItemsCollectionResponse {
  collection: CollectionResponse
  items: ItemStructure[]
}

export default ItemsCollectionResponse;
