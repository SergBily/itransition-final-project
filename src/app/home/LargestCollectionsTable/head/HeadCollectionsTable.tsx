import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { defaultNameFields } from '../../../../shared';
import styles from './styles.module.scss';

const createCell = (name: string): JSX.Element => (
  <TableCell
    align="left"
    key={name}
    className={styles.tableHeadCell}
  >
    <FormattedMessage id={`app.collection.new.field.${name}`} />
  </TableCell>
);

const HeadCollectionsTable: React.FC = (): JSX.Element => (
  <TableHead>
    <TableRow className={styles.tableHead}>
      {defaultNameFields.map((n) => createCell(n))}
    </TableRow>
  </TableHead>
);

export default HeadCollectionsTable;
