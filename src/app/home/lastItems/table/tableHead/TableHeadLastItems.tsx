import React from 'react';
import TableHead from '@mui/material/TableHead';
import {
  TableCell, TableRow,
} from '@mui/material';

import styles from './styles.module.scss';

const TableHeadLastItems = () => (
  <TableHead className={styles.root}>
    <TableRow>
      <TableCell
        className={styles.tableCell}
        align="left"
        padding="normal"
      >
        Title
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeadLastItems;
