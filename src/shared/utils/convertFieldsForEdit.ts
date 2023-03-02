import Collection from '../models/allCollections/collection.type';
import ItemStructure from '../models/items/itemStructure.model';
import addNewFields from './addNewFields';

const convertFieldsForEdit = (items: ItemStructure, collection: Collection)
: Record<string, Record<string, any>> => {
  let y: Record<string, Record<string, any>> = {};
  Object.entries(collection.customFields).forEach((b) => {
    Object.entries(items.customFields).forEach((v) => {
      b[1].forEach((d: string) => {
        if (Object.hasOwn(v[1], d)) {
          y = { ...y, [`${b[0]}`]: { ...y[`${b[0]}`], [`${d}`]: v[1][`${d}`] } };
        }
      });
    });
  });
  return addNewFields(collection, y);
};

export default convertFieldsForEdit;
