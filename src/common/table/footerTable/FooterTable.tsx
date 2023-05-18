import React from 'react';
import { TableFooter, TablePagination, TableRow } from '@mui/material';
import styles from './styles.module.scss';
import TablePaginationActions from '../pagination/TablePaginationActions';

interface FooterTableProp {
  page: number;
  rowsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
}

const FooterTable: React.FC<FooterTableProp> = (
  {
    page, rowsPerPage, setPage, setRowsPerPage,
  },
): JSX.Element => {
  const countItems = 10;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          className={styles.pagination}
          rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
          count={countItems}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            inputProps: {
              'aria-label': 'rows per page',
            },
            native: true,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default FooterTable;
