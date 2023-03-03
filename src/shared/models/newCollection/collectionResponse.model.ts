import CustomFields from './customFields.model';

interface CollectionResponse {
  imageUrl: string;
  topic: string;
  title: string;
  description: string;
  customFields: CustomFields;
  id: string;
}

export default CollectionResponse;
