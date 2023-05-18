import React from 'react';
import {
  Box,
  TableBody,
  TableCell, TableRow,
} from '@mui/material';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { routes } from '../../../../shared';
import { ItemStructure } from '../../../../shared/models';

interface BodyLastItemsTableProp {
  lastItems: ItemStructure[];
  page: number;
  rowsPerPage: number;
}

const BodyLastItemsTable: React.FC<BodyLastItemsTableProp> = (
  { lastItems, page, rowsPerPage },
): JSX.Element => {
  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0;
  const emptyRowsPerPage = 0;

  return (
    <TableBody className={styles.tableBody}>
      { (rowsPerPage > emptyRowsPerPage
        ? lastItems
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : lastItems
      ).map((row) => (
        <TableRow key={row.id} hover className={styles.blockLink}>
          <TableCell
            className={classNames(styles.tableCell, styles.tableCellTitle)}
            key={row.id}
            component="th"
            scope="row"
            padding="none"
          >
            {row.title}
          </TableCell>
          <Box component="td" className={styles.link}>
            <Link
              to={routes.ITEM_READ(row.collectionId, row.id)}
              className={styles.link}
            />
          </Box>
        </TableRow>
      ))}
      {emptyRows > emptyRowsPerPage && (
      <TableRow style={{ height: 53 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
      )}
    </TableBody>
  );
};

export default BodyLastItemsTable;
