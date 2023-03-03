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
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/hooks';
import routes from '../../../../shared/constants/routes';
import styles from './styles.module.scss';
import getSelectedTitles from '../../../../shared/utils/getSelectedTitles';
import { deleteItems } from '../../../../redux/features/ItemsCollectionSlice';
import DeleteDialog from '../../../../common/dialog/deleteDialog';

interface EnhancedTableToolbarProps {
  selected: string[];
  id: string,
  setSelected: (a: string[]) => void;
  manageId: string | undefined;
}

const ItemsTableToolbar = ({
  selected, id, setSelected, manageId,
}: EnhancedTableToolbarProps) => {
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
      {selected.length === 1
        && (
        <>
          <Link
            to={`${routes.COLLECTION}${id}/item/${selected[0]}`}
            className={styles.link}
          >
            <Tooltip title={<FormattedMessage id="app.item.tooltip.open" />}>
              <IconButton>
                <Typography
                  variant="body2"
                  color="initial"
                  className={styles.tooltipButton}
                >
                  <FormattedMessage id="app.item.tooltip.open" />
                </Typography>
                <FileOpenIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Link>
          <Link
            to={manageId
              ? `${routes.COLLECTION}${id}/edit/${selected[0]}/${manageId}`
              : `${routes.COLLECTION}${id}/edit/${selected[0]}`}
            className={styles.link}
          >
            <Tooltip title={<FormattedMessage id="app.item.tooltip.edit" />}>
              <IconButton>
                <EditIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Link>
        </>
        )}
      {selected.length > 0 ? (
        <Tooltip title={<FormattedMessage id="app.item.tooltip.delete" />}>
          <IconButton onClick={() => setOpen(true)}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title={<FormattedMessage id="app.item.tooltip.filter" />}>
            <IconButton>
              <FilterListIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Link
            to={manageId
              ? `${routes.COLLECTION}${id}/item/create/${manageId}`
              : `${routes.COLLECTION}${id}/item/create`}
            className={styles.link}
          >
            <Tooltip
              title={<FormattedMessage id="app.item.tooltip.add" />}
              className={styles.tooltip}
            >
              <IconButton>
                <AddIcon fontSize="large" />
                <Typography
                  variant="body2"
                  color="initial"
                  className={styles.tooltipButton}
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
