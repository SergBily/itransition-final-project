import Collection from '../models/allCollections/collection.type';
import ItemStructure from '../models/items/itemStructure.model';

const convertItemsForTable = (items: ItemStructure[], collection: Collection)
: Record<string, string>[] => items.map((i) => {
  let y = { id: i.id, title: i.title } as Record<string, string>;
  const nn: string[] = [];
  Object.values(collection.customFields).forEach((v) => {
    nn.push(v);
  });
  nn.flat().forEach((title) => {
    Object.entries(i.customFields).forEach((v) => {
      if (Object.hasOwn(v[1], title)) {
        y = { ...y, [`${title}`]: v[1][`${title}`] };
      }
    });
    if (!Object.hasOwn(y, title)) {
      y = { ...y, [`${title}`]: '' };
    }
  });
  return y;
});

export default convertItemsForTable;
