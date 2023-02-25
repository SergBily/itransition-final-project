import ItemStructure from '../models/items/itemStructure';

const convertItemsForTable = (items: ItemStructure[]): Record<string, string>[] => items.map((i) => {
  let y = { id: i.id, title: i.title };
  Object.entries(i.customFields).forEach((v) => {
    y = { ...y, ...v[1] };
  });
  return y;
});

export default convertItemsForTable;
