import React, { useState } from 'react';
import {
  IconButton, Toolbar, Tooltip, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import routes from '../../../../shared/constants/routes';
import styles from './styles.module.scss';
import getSelectedTitles from '../../../../shared/utils/getSelectedTitles';
import { deleteItems } from '../../../../redux/features/ItemsCollectionSlice';
import DeleteDialog from '../../../../common/dialog/deleteDialog';

interface EnhancedTableToolbarProps {
  selected: string[];
  id: string,
  setSelected: (a: string[]) => void
}

const ItemsTableToolbar = ({ selected, id, setSelected }: EnhancedTableToolbarProps) => {
  const [open, setOpen] = useState(false);
  const { collection } = useAppSelector((state) => state.items);
  const items = useAppSelector((state) => state.items.items);
  const dispatch = useAppDispatch();

  const handelDelete = () => {
    dispatch(deleteItems(selected));
    setSelected([]);
  };

  return (
    <Toolbar
      className={styles.root}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) => alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity,
          ),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography
          className={styles.typography}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected.length}
          {' '}
          selected
        </Typography>
      ) : (
        <Typography
          className={styles.typography}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {collection && collection.title.toUpperCase()}
        </Typography>
      )}
      {selected.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => setOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Link
            to={`${routes.COLLECTION}${id}/item/create`}
            className={styles.link}
          >
            <Tooltip title="Add item" className={styles.tooltip}>
              <IconButton>
                <AddIcon fontSize="large" />
                <Typography
                  variant="body2"
                  color="initial"
                  className={styles.addButton}
                >
                  <FormattedMessage id="app.item.new.create" />
                </Typography>
              </IconButton>
            </Tooltip>
          </Link>
        </>
      )}
      <DeleteDialog
        payload={{
          type: 'item(s)',
          title: getSelectedTitles(items, selected),
          open,
          setOpen,
          handelDelete,
        }}
      />
    </Toolbar>
  );
};

export default ItemsTableToolbar;
