import ItemStructure from '../items/itemStructure';
import InitialState from './initialState';

interface ItemState extends InitialState {
  item: ItemStructure | null,
  errors: string[]
}

export default ItemState;
