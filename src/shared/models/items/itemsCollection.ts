import CollectionResponse from '../newCollection/collectionResponse';
import InitialState from '../state/initialState';
import ItemStructure from './itemStructure';

interface ItemsCollection extends InitialState {
  items: ItemStructure[],
  errors: string[],
  collection: Collection | null,
  delStatus: 'idle' | 'loading' | 'failed' | 'success'
}

export type Collection = Omit<CollectionResponse, 'imageUrl' | 'description'>;

export default ItemsCollection;
