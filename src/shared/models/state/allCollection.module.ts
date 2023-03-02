import InitialState from './initialState.model';
import AllCollectionsResponse from '../allCollections/allCollectionsResponse.model';

interface AllCollection extends InitialState {
  allCollections?: AllCollectionsResponse[];
  mainPageCollection: AllCollectionsResponse[] | null
  errors: string[]
}

export default AllCollection;
