import React, { useEffect } from 'react';
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
import { LoginForm } from '../../../shared/models/authForm.model';
import authValidator from '../../../shared/validators/authValidator';
import passwordValidator from '../../../shared/validators/passwordValidaor';
import Errors from '../../../common/errors/Errors';
import { login, reset } from '../../../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { selectErrorMessage, selectStatus, selectUser } from '../../../redux/selectors/authSelectors';
import toastConfig from '../../../shared/toast/toastConfig';
import Spinner from '../../../common/spinner/Spinner';
import setUserData from '../../../shared/utils/setUserData';
import styles from './styles.module.scss';

const Login: React.FC = (): JSX.Element => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm <LoginForm>();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const errorMessage = useAppSelector(selectErrorMessage);
  const navigate = useNavigate();
  const {
    name, token, userId, role,
  } = useAppSelector(selectUser);

  useEffect(() => {
    if (status === 'failed' && errorMessage === 'Wrong password') {
      toast.warn(<FormattedMessage id="app.signup.errors5" />, toastConfig);
      dispatch(reset());
    }
    if (status === 'success') {
      setUserData({
        name, token, userId, role,
      });
      toast.success(<FormattedMessage
        id="app.login.success"
        values={{ name }}
      />, toastConfig);
      navigate(routes.HOME);
      dispatch(reset());
    }
    if (status === 'failed' && errorMessage === 'app.user.access') {
      toast.warn(<FormattedMessage
        id={errorMessage}
      />, toastConfig);
      dispatch(reset());
    }
  }, [status, errorMessage]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onFormSubmit = (data: LoginForm): void => {
    dispatch(login(data));
  };

  return (
    <Container maxWidth="xs" className={styles.container}>
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
          <Grid
            item
            xs={12}
            className={styles.gridItem}
          >
            <TextField
              className={styles.emailInput}
              type="email"
              id="outlined-basic"
              label={<FormattedMessage id="app.login.email" />}
              variant="outlined"
              {...register('email', authValidator('Email'))}
            />
            <Errors message={errors.email?.message} position="-25px" />
          </Grid>
          <Grid
            item
            xs={12}
            className={styles.gridItem}
          >
            <FormControl
              variant="outlined"
              className={styles.passwordInput}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                <FormattedMessage id="app.login.password" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
              <FormattedMessage id="app.header.login" />
            </Button>
          </Grid>
        </form>
        <Grid item xs={12}>
          <Typography variant="body1">
            <FormattedMessage id="app.login.text1" />
          </Typography>
          <Link
            to={routes.SIGNUP}
            className={styles.link}
          >
            <Typography variant="body1">
              <FormattedMessage id="app.login.text2" />
            </Typography>
          </Link>
        </Grid>
      </Grid>
      {status === 'loading' && <Spinner />}
    </Container>
  );
};

export default Login;
