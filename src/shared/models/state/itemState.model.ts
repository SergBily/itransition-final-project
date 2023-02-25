import ItemStructure from '../items/itemStructure.model';
import InitialState from './initialState.model';

interface ItemState extends InitialState {
  item: ItemStructure | null,
  errors: string[]
}

export default ItemState;
