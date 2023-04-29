import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Grid, FormControl, InputLabel,
  OutlinedInput, InputAdornment, IconButton, TextField, Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import routes from '../../../shared/constants/routes';
import authValidator from '../../../shared/validators/authValidator';
import Errors from '../../../common/errors/Errors';
import passwordValidator from '../../../shared/validators/passwordValidaor';
import { useAppDispatch } from '../../../shared/hooks/hooks';
import toastConfig from '../../../shared/toast/toastConfig';
import Spinner from '../../../common/spinner/Spinner';
import styles from './styles.module.scss';
import { AuthData, AuthForm } from '../../../shared/models';
import { authApi } from '../../../shared/apis';
import { cacheKeys } from '../../../shared/constants';
import { initUserState } from '../../../redux/features';
import { handleMouseDownPassword } from '../../../shared/utils';

const Signup: React.FC = (): JSX.Element => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<AuthForm>();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setRegistration, {
    data: dataRegistration, isSuccess, isError, isLoading,
  }] = authApi.useRegistrationMutation({ fixedCacheKey: cacheKeys.AUTH.REGISTRATION });

  useEffect(() => {
    if (isError) {
      toast.warn(<FormattedMessage id="app.signup.errors5" />, toastConfig);
    }
    if (isSuccess && dataRegistration) {
      const {
        name, token, userId, role,
      } = dataRegistration;
      const userDate: AuthData = {
        name, token, userId, role,
      };
      dispatch(initUserState(userDate));
      toast.success(<FormattedMessage
        id="app.signup.success"
        values={{ name }}
      />, toastConfig);
      navigate(routes.HOME);
    }
  }, [isSuccess, isError]);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const onFormSubmit = (data: AuthForm): void => {
    setRegistration((data));
  };

  return (
    <Container
      maxWidth="xs"
      className={styles.container}
    >
      <Grid
        container
        className={styles.root}
      >
        <Grid item xs={12}>
          <Typography
            className={styles.title}
            variant="h4"
          >
            CollectMan
          </Typography>
        </Grid>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className={styles.form}
        >
          <Grid item xs={12} className={styles.gridItem}>
            <TextField
              className={styles.nameInput}
              type="name"
              id="name"
              label={<FormattedMessage id="app.signup.name" />}
              variant="outlined"
              {...register('name', authValidator('Name'))}
            />
            <Errors message={errors.name?.message} position="-40px" />
          </Grid>
          <Grid item xs={12} className={styles.gridItem}>
            <TextField
              className={styles.emailInput}
              type="email"
              id="email"
              label={<FormattedMessage id="app.login.email" />}
              variant="outlined"
              {...register('email', authValidator('Email'))}
            />
            <Errors message={errors.email?.message} position="-25px" />
          </Grid>
          <Grid item xs={12} className={styles.gridItem}>
            <FormControl
              className={styles.passwordInput}
              variant="outlined"
            >
              <InputLabel htmlFor="password">
                <FormattedMessage id="app.login.password" />
              </InputLabel>
              <OutlinedInput
                id="password"
                error={!!errors.name}
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
          <Grid item xs={12}>
            <Button
              className={styles.btn}
              color="info"
              type="submit"
              variant="contained"
              fullWidth
            >
              <FormattedMessage id="app.header.signup" />
            </Button>
          </Grid>
        </form>
        <Grid item xs={12}>
          <Typography variant="body1">
            <FormattedMessage id="app.signup.text1" />
          </Typography>
          <Link
            to={routes.LOGIN}
            className={styles.link}
          >
            <Typography variant="body1">
              <FormattedMessage id="app.header.login" />
            </Typography>
          </Link>
        </Grid>
      </Grid>
      {isLoading && <Spinner />}
    </Container>
  );
};

export default Signup;
