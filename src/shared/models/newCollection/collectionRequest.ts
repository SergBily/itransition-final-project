import CustomFields from './customFields.model';
import DropImage from './imageFile.model';

interface CollectionRequest {
  userId: string,
  customFields: CustomFields,
  image: DropImage,
  topic: string,
  title: string,
  description: string
}

export default CollectionRequest;
