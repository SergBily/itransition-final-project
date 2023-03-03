import InitialState from './initialState.model';
import CollectionResponse from '../newCollection/collectionResponse.model';

interface NewCollection extends InitialState {
  collection?: CollectionResponse;
  errors: string[];
}

export default NewCollection;
