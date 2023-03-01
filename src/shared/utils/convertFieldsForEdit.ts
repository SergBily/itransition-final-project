import Collection from '../models/allCollections/collection.type';
import ItemStructure from '../models/items/itemStructure.model';

const convertFieldsForEdit = (items: ItemStructure, collection: Collection)
: Record<string, Record<string, any>> => {
  let y: Record<string, Record<string, any>> = {};
  Object.entries(collection.customFields).forEach((b) => {
    Object.entries(items.customFields).forEach((v) => {
      if (Object.hasOwn(v[1], b[1])) {
        y = { ...y, [`${b[0]}`]: { [`${b[1]}`]: v[1][`${b[1]}`] } };
      }
    });
    let cc = {};
    Object.values(y).forEach((k) => {
      cc = { ...b, ...k };
    });
    if (!Object.hasOwn(cc, b[1]) && b[1].length !== 0) {
      y = { ...y, [`${b[0]}`]: { [`${b[1]}`]: '' } };
    }
  });
  return y;
};

export default convertFieldsForEdit;
