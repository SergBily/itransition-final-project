import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/hooks';

import TableHeadLastItems from '../tableHead/TableHeadLastItems';
import styles from './styles.module.scss';
import routes from '../../../../../shared/constants/routes';
import TablePaginationActions from '../../../readItemsTable/pagination/TablePaginationActions';
import { getLastItems } from '../../../../../redux/features/itemSlice';

const LastItemsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customFields, setcustomFields] = useState<Record<string, string>[] | null>(null);
  const dispatch = useAppDispatch();
  const {
    lastItems,
  } = useAppSelector((state) => state.item);

  useEffect(() => {
    dispatch(getLastItems());
    setcustomFields(customFields);
    gsap.to(
      '.animationTable',
      { opacity: 1, duration: 0.9, ease: 'power1.inOut' },
    );
  }, []);

  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0;

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
    <Box component="div" className={classNames(styles.root, 'animationTable')}>
      <TableContainer component={Paper}>
        <Table className={styles.table} aria-label="custom pagination table">
          <TableHeadLastItems />
          <TableBody className={styles.tableBody}>
            {lastItems && (rowsPerPage > 0
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
                  {row.title.slice(0, 1).toUpperCase() + row.title.slice(1)}
                </TableCell>
                <Box component="td" className={styles.link}>
                  <Link
                    to={`${routes.COLLECTION}${row.collectionId}/item/${row.id}`}
                    className={styles.link}
                  />
                </Box>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                className={styles.pagination}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={10}
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
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LastItemsTable;
