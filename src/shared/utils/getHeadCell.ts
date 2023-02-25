import HeadCell from '../models/itemsTable/headCell';
import CustomFields from '../models/newCollection/customFields.model';
import generateKey from './UniqueKey';

const getHeadCell = (p: CustomFields): HeadCell[] => {
  const b: HeadCell[] = [{
    id: 'title',
    type: 'string',
    disablePadding: false,
    label: 'title',
    align: false,
  }];
  Object.entries(p).forEach((v) => {
    v[1].forEach((title: string) => {
      // if (v[1].length !== 0) {
      b.push({
        id: generateKey(),
        type: v[0],
        disablePadding: false,
        label: title,
        align: true,
      });
      // }
    });
  });

  return b;
};

export default getHeadCell;
