import React, { useEffect, useState } from 'react';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import {
  Box, TableCell, TableRow,
} from '@mui/material';
import HeadCell from '../../../../../shared/models/itemsTable/headCell.model';
import { useAppSelector } from '../../../../../shared/hooks/stateHooks';
import getHeadCell from '../../../../../shared/utils/getHeadCell';
import Collection from '../../../../../shared/models/allCollections/collection.type';
import styles from './styles.module.scss';
import Order from '../../../../../shared/models/items/order.type';

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const [headCells, setHeadCells] = useState<HeadCell[] | null>(null);
  const {
    order, orderBy, onRequestSort,
  } = props;
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  const { status, collection } = useAppSelector((state) => state.items);

  useEffect(() => {
    if (status === 'success') {
      setHeadCells(getHeadCell((collection as Collection).customFields));
    }
  }, [status]);

  return (
    <TableHead className={styles.root}>
      <TableRow>
        {headCells && headCells.map((headCell) => (
          <TableCell
            className={styles.tableCell}
            key={headCell.id}
            align={headCell.align ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.label}
              direction={orderBy === headCell.label ? order : 'asc'}
              onClick={createSortHandler(headCell.label)}
            >
              {headCell.label.toUpperCase()}
              {orderBy === headCell.label ? (
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

export default EnhancedTableHead;
