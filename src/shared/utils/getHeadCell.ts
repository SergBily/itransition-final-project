import HeadCell from '../models/itemsTable/headCell';
import CustomFields from '../models/newCollection/customFields.model';

const getHeadCell = (p: CustomFields): HeadCell[] => {
  const title: HeadCell[] = [];
  for (const [key, value] of Object.entries(p)) {
    value.forEach((e: string) => {
      title.push({
        id: e,
        type: key,
        disablePadding: false,
        label: e,
        align: true,
      });
    });
  }
  return title;
};

export default getHeadCell;
