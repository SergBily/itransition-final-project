import ItemStructure from '../items/itemStructure.model';
import InitialState from './initialState.model';

interface ItemState extends InitialState {
  item: ItemStructure | null,
  errors: string[]
  editStatus: 'idle' | 'loading' | 'failed' | 'success'
}

export default ItemState;
