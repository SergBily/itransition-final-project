import InitialState from './initialState';
import AllCollectionsResponse from '../allCollections/allCollectionsResponse';

interface AllCollection extends InitialState {
  allCollections?: AllCollectionsResponse[];
  errors: string[]
}

export default AllCollection;
