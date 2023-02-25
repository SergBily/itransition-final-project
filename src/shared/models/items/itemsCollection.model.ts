import CollectionResponse from '../newCollection/collectionResponse.model';
import InitialState from '../state/initialState.model';
import ItemStructure from './itemStructure.model';

interface ItemsCollection extends InitialState {
  items: ItemStructure[],
  errors: string[],
  collection: Collection | null,
  delStatus: 'idle' | 'loading' | 'failed' | 'success'
}

export type Collection = Omit<CollectionResponse, 'imageUrl' | 'description'>;

export default ItemsCollection;
