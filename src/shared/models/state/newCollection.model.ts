import InitialState from './initialState';
import CollectionResponse from '../newCollection/collectionResponse';

interface NewCollection extends InitialState {
  collection?: CollectionResponse,
  errors: string[]
}

export default NewCollection;
