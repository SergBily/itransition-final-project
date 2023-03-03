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
import routes from '../../shared/constants/routes';
import backgroundImage from '../../assets/images/background.png';
import { LoginForm } from '../../shared/models/authForm.model';
import authValidator from '../../shared/validators/authValidator';
import passwordValidator from '../../shared/validators/passwordValidaor';
import Errors from '../../common/errors/Errors';
import { login, reset } from '../../redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks';
import { selectErrorMessage, selectStatus, selectUser } from '../../redux/selectors/authSelectors';
import toastConfig from '../../shared/toast/toastConfig';
import Spinner from '../../common/spinner/Spinner';
import setUserData from '../../shared/utils/setUserData';

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
    <Container maxWidth="xs" sx={{ transform: 'translate(0, 50%)' }}>
      <Grid
        container
        sx={{
          background: `no-repeat center url(${backgroundImage})`,
          p: '10px',
          boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%),
                      0px 4px 5px 0px rgb(0 0 0 / 14%),
                      0px 1px 10px 0px rgb(0 0 0 / 12%)`,
          borderRadius: '10px',
        }}
      >
        <Grid item xs={12}>
          <Typography mb={2} variant="h4">CollectMan</Typography>
        </Grid>
        <form onSubmit={handleSubmit(onFormSubmit)} style={{ width: '100%' }}>
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <TextField
              sx={{ width: '100%', mb: 3, mt: 3 }}
              type="email"
              id="outlined-basic"
              label={<FormattedMessage id="app.login.email" />}
              variant="outlined"
              {...register('email', authValidator('Email'))}
            />
            <Errors message={errors.email?.message} position="-25px" />
          </Grid>
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <FormControl sx={{ mt: 1, mb: 5, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                <FormattedMessage id="app.login.password" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
                label="Password"
              />
              <Errors message={errors.password?.message} position="-45px" />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ mb: 2 }}
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
            style={{
              textDecoration: 'none',
              color: 'red',
            }}
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
