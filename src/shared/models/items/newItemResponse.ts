import ItemStructure from './itemStructure';

interface NewItemRequest extends ItemStructure {
  userId: string,
  collectionId: string
}

export default NewItemRequest;
