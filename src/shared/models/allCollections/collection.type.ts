import CollectionResponse from '../newCollection/collectionResponse.model';

type Collection = Omit<CollectionResponse, 'imageUrl' | 'description'>;

export default Collection;
