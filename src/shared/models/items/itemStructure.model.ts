import CustomFields from '../newCollection/customFields.model';

interface ItemStructure {
  item: any;
  id: string;
  title: string;
  tags: string[];
  customFields: CustomFields;
  visits: number;
  likes: string[];
}

export default ItemStructure;
