import CustomFields from '../newCollection/customFields.model';

interface AllCollectionsResponse {
  imageUrl: string;
  customFields: CustomFields;
  topic: string;
  title: string;
  description: string;
  id: string;
}

export default AllCollectionsResponse;
