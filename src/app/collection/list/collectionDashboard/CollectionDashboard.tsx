import React, { useEffect, useState } from 'react';
import { Tooltip, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import gsap from 'gsap';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from './sytles.module.scss';
import DeleteDialog from '../../../../common/dialog/deleteDialog';

type PayloadDashboard = {
  isHovering: boolean,
  id: string,
  title: string,
  deleteCollection: () => void
};

interface CollectionDashboardProps {
  payload: PayloadDashboard
}

const CollectionDashboard = ({ payload }: CollectionDashboardProps) => {
  const {
    isHovering, id, title, deleteCollection,
  } = payload;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (isHovering) {
      gsap.to(
        `#id${id}`,
        { left: 5, duration: 0.5, ease: 'power1.inOut' },
      );
    } else {
      gsap.to(
        `#id${id}`,
        { left: -105, duration: 0.5, ease: 'power1.inOut' },
      );
    }
  }, [isHovering]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Paper
      id={`id${id}`}
      className={classNames(styles.root, 'dashboard')}
      elevation={5}
    >
      <Box
        component="div"
        className={styles.container}
      >
        <Tooltip title={<FormattedMessage id="app.collection.dashboard" />}>
          <IconButton onClick={handleClickOpen} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.collection.dashboard2" />}>
          <IconButton color="warning">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <DeleteDialog
        payload={{
          type: 'collection', title, open, setOpen, deleteCollection,
        }}
      />
    </Paper>
  );
};

export default CollectionDashboard;
