import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from '../../../shared';
import styles from './styles.module.scss';

interface AuthAddInformationProp {
  label: string;
}

const AuthAddInformation: React.FC<AuthAddInformationProp> = ({ label }): JSX.Element => (
  <>
    <Typography variant="body1">
      <FormattedMessage id={`app.${label}.text1`} />
    </Typography>
    <Link
      to={label === 'login' ? routes.SIGNUP : routes.LOGIN}
      className={styles.link}
    >
      <Typography variant="body1">
        <FormattedMessage id={`app.${label}.text2`} />
      </Typography>
    </Link>

  </>
);

export default AuthAddInformation;
