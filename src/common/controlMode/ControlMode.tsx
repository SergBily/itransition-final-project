import React from 'react';
import {
  Box, IconButton, Tooltip, Typography,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import routes from '../../shared/constants/routes';
import styles from './styles.module.scss';

const ControlMode = () => (
  <Box component="div" className={styles.root}>
    <Tooltip title={<FormattedMessage id="app.item.tooltip.open" />}>
      <IconButton color="error">
        <ManageAccountsIcon fontSize="large" />
        <Typography
          variant="body2"
          color="initial"
          className={styles.tooltipButton}
        >
          <FormattedMessage id="app.admin.tooltip.manage" />
        </Typography>
      </IconButton>
    </Tooltip>
    <Link
      to={routes.ADMIN}
      className={styles.link}
    >
      <Tooltip title={<FormattedMessage id="app.admin.tooltip.exit" />}>
        <IconButton color="error">
          <ExitToAppIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Link>
  </Box>
);

export default ControlMode;
