import CustomFields from '../newCollection/customFields.model';

interface ItemStructure {
  item: any;
  id: string,
  title: string,
  tags: string[],
  customFields: CustomFields
}

export default ItemStructure;
