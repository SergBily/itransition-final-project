import React from 'react';
import { Typography } from '@mui/material';
import styles from './styles.module.scss';

const AuthTitle: React.FC = (): JSX.Element => (
  <Typography
    className={styles.root}
    variant="h4"
  >
    CollectMan
  </Typography>
);

export default AuthTitle;
