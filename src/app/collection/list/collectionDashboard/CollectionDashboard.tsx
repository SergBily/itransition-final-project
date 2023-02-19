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

interface CollectionDashboardProps {
  onItem: boolean,
  id: string,
  title: string
}

const CollectionDashboard = ({ onItem, id, title }: CollectionDashboardProps) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (onItem) {
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
  }, [onItem]);

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
      <DeleteDialog type="collection" name={title} open={open} setOpen={setOpen} />
    </Paper>
  );
};

export default CollectionDashboard;
