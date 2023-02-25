interface NewItemRequest {
  userId: string,
  collectionId: string,
  title: string,
  tags: string[],
  customFields: CustomFields
}

interface CustomFields {
  number: Record<string, string>,
  string: Record<string, string>,
  textarea: Record<string, string>,
  date: Record<string, string>,
  checkbox: Record<string, string>,
}

export default NewItemRequest;
