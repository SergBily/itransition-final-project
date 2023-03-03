import HeadCell from '../models/itemsTable/headCell.model';
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
      b.push({
        id: generateKey(),
        type: v[0],
        disablePadding: false,
        label: title,
        align: true,
      });
    });
  });

  return b;
};

export default getHeadCell;
