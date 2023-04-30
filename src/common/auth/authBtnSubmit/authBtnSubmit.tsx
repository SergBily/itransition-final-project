import { Button } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

interface AuthBtnSubmitProp {
  label: string;
}

const AuthBtnSubmit: React.FC<AuthBtnSubmitProp> = ({ label }): JSX.Element => (
  <Button
    className={styles.root}
    color="info"
    type="submit"
    variant="contained"
    fullWidth
  >
    <FormattedMessage id={`app.header.${label}`} />
  </Button>
);

export default AuthBtnSubmit;
