import React from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { FormattedMessage } from 'react-intl';
import Order from '../../../shared/models/items/order.type';
import styles from './styles.module.scss';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: React.ReactNode;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: <FormattedMessage id="app.admin.id" />,
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="app.admin.name" />,
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="app.admin.email" />,
  },
  {
    id: 'registrationDate',
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="app.admin.regist" />,
  },
  {
    id: 'role',
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="app.admin.role" />,
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: <FormattedMessage id="app.admin.status" />,
  },
];

interface AdminTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const AdminTableHead = (props: AdminTableHeadProps) => {
  const {
    onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,
  } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            className={styles.title}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default AdminTableHead;
