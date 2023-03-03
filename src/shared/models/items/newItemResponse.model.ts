import ItemStructure from './itemStructure.model';

interface NewItemResponse extends ItemStructure {
  userId: string;
  collectionId: string;
}

export default NewItemResponse;
