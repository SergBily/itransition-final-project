import React, { useState, useEffect, useContext } from 'react';
import {
  Container, Typography, Grid, FormControl, InputLabel,
  OutlinedInput, InputAdornment, IconButton, TextField, Button,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import routes from '../../shared/constants/routes';
import backgroundImage from '../../assets/logo/imgs/background.png';
import GlobalContext from '../../shared/contexts/GlobalContext';
// import passwordValidator from '../../shared/validators/passwordValidaor';
import authValidator from '../../shared/validators/authValidator';
import Errors from '../../common/errors/Errors';
import passwordValidator from '../../shared/validators/passwordValidaor';

interface FormInputs {
  name: string,
  email: string,
  password: string,
}

const Signup: React.FC = (): JSX.Element => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<FormInputs>();
  const { currentLocale } = useContext(GlobalContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  // const intl = useIntl();
  // const translatedMessage = () => intl.formatMessage({ id: 'app.signup.errors1' });

  useEffect(() => {
    console.log(1);
  }, [currentLocale]);

  const onFormSubmit = (values: any): void => {
    console.log(values);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ transform: 'translate(0, 35%)' }}
    >
      <Grid
        container
        sx={{
          background: `no-repeat center / cover url(${backgroundImage})`,
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
              sx={{ width: '100%', mb: 1, boxShadow: 'inset 20px 20px 0px 20px transparent' }}
              type="name"
              id="name"
              label={<FormattedMessage id="app.signup.name" />}
              variant="outlined"
              {...register('name', authValidator('Name'))}
            />
            <Errors message={errors.name?.message} position="-40px" />
          </Grid>
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <TextField
              sx={{ width: '100%', mb: 3, mt: 3 }}
              type="email"
              id="email"
              label={<FormattedMessage id="app.login.email" />}
              variant="outlined"
              {...register('email', authValidator('Email'))}
            />
            <Errors message={errors.email?.message} position="-25px" />
          </Grid>
          <Grid item xs={12} sx={{ position: 'relative' }}>
            <FormControl sx={{ width: '100%', mb: 5, mt: 1 }} variant="outlined">
              <InputLabel htmlFor="password">
                <FormattedMessage id="app.login.password" />
              </InputLabel>
              <OutlinedInput
                id="password"
                error={!!errors.name}
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
            style={{
              textDecoration: 'none',
              color: 'red',
            }}
          >
            <Typography variant="body1">
              <FormattedMessage id="app.header.login" />
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
