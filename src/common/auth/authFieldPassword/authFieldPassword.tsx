import React, { useState } from 'react';
import {
  FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput,
} from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { authValidator, passwordValidator, handleMouseDownPassword } from '../../../shared';
import Errors from '../../errors/Errors';
import { AuthForm } from '../../../shared/models';
import styles from './styles.module.scss';

interface AuthFieldPasswordProp {
  register: UseFormRegister<AuthForm>;
  errors: FieldErrors<AuthForm>;
}

const AuthFieldPassword: React.FC<AuthFieldPasswordProp> = (
  {
    register, errors,
  },
): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Grid item xs={12} className={styles.root}>
      <FormControl
        variant="outlined"
        className={styles.formControl}
      >
        <InputLabel htmlFor="password">
          <FormattedMessage id="app.auth.password" />
        </InputLabel>
        <OutlinedInput
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            ...authValidator('Password'),
            validate: passwordValidator,
          })}
          endAdornment={(
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
            )}
        />
        <Errors message={errors.password?.message} position="-45px" />
      </FormControl>
    </Grid>
  );
};

export default AuthFieldPassword;
