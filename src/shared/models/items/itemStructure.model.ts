import CustomFields from '../newCollection/customFields.model';

interface ItemStructure {
  item: any;
  id: string;
  title: string;
  tags: string[];
  customFields: CustomFields;
  visits: number;
  likes: string[];
  collectionId: string
}

export interface LastItems {
  id: string;
  title: string;
  [index: string]: string;
}

export default ItemStructure;
