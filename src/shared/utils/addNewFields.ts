import Collection from '../models/allCollections/collection.type';

const addNewFields = (collection: Collection, item: Record<string, Record<string, any>>) => {
  let itemCopy = item;
  Object.entries(collection.customFields).forEach((b) => {
    Object.entries(item).forEach((v) => {
      b[1].forEach((d: string) => {
        if (b[0] === v[0]) {
          if (!Object.hasOwn(v[1], d)) {
            itemCopy = {
              ...itemCopy,
              [`${b[0]}`]: { ...itemCopy[`${b[0]}`], [`${d}`]: v[0] === 'checkbox' ? false : '' },
            };
          }
        }
      });
    });
  });
  return itemCopy;
};

export default addNewFields;
