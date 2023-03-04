import ItemStructure from '../items/itemStructure.model';
import Tags from '../items/tags.module';
import InitialState from './initialState.model';

interface ItemState extends InitialState {
  item: ItemStructure | null;
  errors: string[];
  editStatus: 'idle' | 'loading' | 'failed' | 'success';
  lastItems: ItemStructure[];
  tags: Tags[] | null;
  tagsStatus: 'idle' | 'loading' | 'failed' | 'success';
}

export default ItemState;
