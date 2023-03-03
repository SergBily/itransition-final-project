import CollectionResponse from './newCollection/collectionResponse.model';

interface EditCollection {
  collection?: CollectionResponse;
  errors: string[];
  editStatus: 'idle' | 'loading' | 'failed' | 'success';
  errorMessage: string;
}

export default EditCollection;
