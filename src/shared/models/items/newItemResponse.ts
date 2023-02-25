import ItemStructure from './itemStructure';

interface NewItemResponse extends ItemStructure {
  userId: string,
  collectionId: string
}

export default NewItemResponse;
