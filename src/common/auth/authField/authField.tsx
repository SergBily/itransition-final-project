import React from 'react';
import { Grid, TextField } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import {
  FieldErrors, UseFormRegister,
} from 'react-hook-form';
import Errors from '../../errors/Errors';
import { AuthForm } from '../../../shared/models';
import { authValidator } from '../../../shared';
import styles from './styles.module.scss';

type FieldName = keyof AuthForm;

interface AuthFieldProp {
  typeName: FieldName;
  register: UseFormRegister<AuthForm>;
  errors: FieldErrors<AuthForm>;
}

const AuthField: React.FC<AuthFieldProp> = (
  {
    typeName, register, errors,
  },
): JSX.Element => (
  <Grid item xs={12} className={styles.root}>
    <TextField
      className={styles.textField}
      type={typeName}
      id={typeName}
      label={<FormattedMessage id={`app.auth.${typeName}`} />}
      variant="outlined"
      {...register(`${typeName}`, authValidator(`${typeName}`))}
    />
    <Errors message={errors.email?.message} position="-25px" />
  </Grid>
);

export default AuthField;
