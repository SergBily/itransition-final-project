import CustomFields from '../newCollection/customFields.model';

interface AllCollectionsResponse {
  image: string,
  customFields: CustomFields,
  topic: string,
  title: string,
  description: string
}

export default AllCollectionsResponse;
