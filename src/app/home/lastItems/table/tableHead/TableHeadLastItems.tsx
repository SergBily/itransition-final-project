import React from 'react';
import TableHead from '@mui/material/TableHead';
import {
  TableCell, TableRow,
} from '@mui/material';

import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

const TableHeadLastItems = () => (
  <TableHead className={styles.root}>
    <TableRow>
      <TableCell
        className={styles.tableCell}
        align="left"
        padding="normal"
      >
        <FormattedMessage id="app.collection.new.field.title" />
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeadLastItems;
