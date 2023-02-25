import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames';
import gsap from 'gsap';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import { getItemsCollection, itemsCollectionReset } from '../../../../redux/features/ItemsCollectionSlice';
import Spinner from '../../../../common/spinner/Spinner';
import ItemsTableToolbar from '../ItemsTableToolbar/ItemsTableToolbar';
import EnhancedTableHead from '../enhancedTableHead/EnhancedTableHead';
import generateKey from '../../../../shared/utils/UniqueKey';
import styles from './styles.module.scss';
import convertItemsForTable from '../../../../shared/utils/convertItemsForTable';
import Order from '../../../../shared/models/items/oreder.type';
import { getComparator, stableSort } from '../../../../shared/sort/sortTable';

const ItemsTable = () => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('title');
  const [selected, setSelected] = useState< string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [customFields, setcustomFields] = useState<Record<string, string>[] | null>(null);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    status, items, delStatus,
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
      setcustomFields(convertItemsForTable(items));
    }
    dispatch(itemsCollectionReset());
  }, [status]);

  useEffect(() => {
    dispatch(getItemsCollection(id as string));
    dispatch(itemsCollectionReset());
  }, [delStatus]);

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  return (
    <Box component="div" className={classNames(styles.root, 'animationTable')}>
      <Paper className={styles.wrapper}>
        <ItemsTableToolbar selected={selected} id={id as string} setSelected={setSelected} />
        <TableContainer>
          <Table
            className={styles.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={items.length}
            />
            <TableBody>
              {customFields && stableSort(customFields, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="info"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {Object.entries(row).map((v, i) => {
                        if (i === 0) return;
                        if (i === 1) {
                          return (
                            <TableCell
                              className={styles.tableCell}
                              key={row.id}
                              component="th"
                              id={labelId}
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
                              {typeof v === 'string' ? v[1] : `${v[1]}`}
                            </ReactMarkdown>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={styles.pagination}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      {(status === 'loading' || delStatus === 'loading') && <Spinner />}
    </Box>
  );
};

export default ItemsTable;
