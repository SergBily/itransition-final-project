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
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, IconButton, Tooltip } from '@mui/material';
import classNames from 'classnames';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormattedMessage } from 'react-intl';
import TablePaginationActions from '../pagination/TablePaginationActions';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import convertItemsForTable from '../../../../shared/utils/convertItemsForTable';
import Collection from '../../../../shared/models/allCollections/collection.type';
import { getItemsCollection, itemsCollectionReset } from '../../../../redux/features/ItemsCollectionSlice';
import generateKey from '../../../../shared/utils/UniqueKey';
import styles from './styles.module.scss';
import EnhancedTableHead from './tableHead/TableHead';
import Order from '../../../../shared/models/items/order.type';
import { getComparator, stableSort } from '../../../../shared/sort/sortTable';
import routes from '../../../../shared/constants/routes';

const ReadItemsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customFields, setcustomFields] = useState<Record<string, string>[] | null>(null);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('title');
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    status, items, collection,
  } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(getItemsCollection(id as string));
    gsap.to(
      '.animationTable',
      { opacity: 1, duration: 0.9, ease: 'power1.inOut' },
    );
  }, []);

  useEffect(() => {
    if (status === 'success') {
      setcustomFields(convertItemsForTable(items, collection as Collection));
    }
    dispatch(itemsCollectionReset());
  }, [status]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - (customFields ? customFields.length : 5)) : 0;

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
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody className={styles.tableBody}>
            {customFields && (rowsPerPage > 0
              ? stableSort(customFields, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : customFields
            ).map((row) => (
              <TableRow key={row.id} hover className={styles.blockLink}>
                {Object.entries(row).map((v, i) => {
                  if (i === 0) return;
                  if (i === 1) {
                    return (
                      <TableCell
                        className={classNames(styles.tableCell, styles.tableCellTitle)}
                        key={row.id}
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {v[1].slice(0, 1).toUpperCase() + v[1].slice(1)}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      className={styles.tableCell}
                      key={generateKey()}
                      align="right"
                    >
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {typeof v[1] === 'string' ? v[1] : v[1] ? 'yes' : 'no'}
                      </ReactMarkdown>
                    </TableCell>
                  );
                })}
                <Box component="td" className={styles.link}>
                  <Link
                    to={`${routes.COLLECTION}${id}/item/${row.id}`}
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
                count={customFields ? customFields.length : 5}
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
      <Link to="/">
        <Tooltip title={<FormattedMessage id="app.item.table.btn.back" />}>
          <IconButton color="info">
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );
};

export default ReadItemsTable;
