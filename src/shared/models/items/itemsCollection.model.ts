import Collection from '../allCollections/collection.type';
import InitialState from '../state/initialState.model';
import ItemStructure from './itemStructure.model';

interface ItemsCollection extends InitialState {
  items: ItemStructure[];
  item: ItemStructure | null;
  errors: string[];
  collection: Collection | null;
  delStatus: 'idle' | 'loading' | 'failed' | 'success';
  getStatus: 'idle' | 'loading' | 'failed' | 'success';
}

export default ItemsCollection;
