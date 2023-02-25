import ItemStructure from '../models/items/itemStructure.model';

const getSelectedTitles = (title: ItemStructure[], selected: string[]): string[] => {
  const n = title.filter((i) => selected.includes(i.id));
  return n.map((i) => i.title);
};

export default getSelectedTitles;
