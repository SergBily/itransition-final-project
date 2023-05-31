import CollectionResponse from '../newCollection/collectionResponse.model';
import InitialState from './initialState.model';

interface AllCollection extends InitialState {
  allCollections?: CollectionResponse[];
  mainPageCollection: CollectionResponse[] | null;
  errors: string[];
}

export default AllCollection;
