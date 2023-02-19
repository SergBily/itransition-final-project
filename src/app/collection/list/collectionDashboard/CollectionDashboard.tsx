import React, { useEffect } from 'react';
import { Tooltip, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import gsap from 'gsap';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from './sytles.module.scss';

interface CollectionDashboardProps {
  onItem: boolean,
  id: string
}

const CollectionDashboard = ({ onItem, id }: CollectionDashboardProps) => {
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
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={<FormattedMessage id="app.collection.dashboard2" />}>
          <IconButton color="warning">
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default CollectionDashboard;
