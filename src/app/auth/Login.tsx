import React from 'react';
import {
  Container, Typography, Grid, FormControl, InputLabel,
  OutlinedInput, InputAdornment, IconButton, TextField,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import routes from '../../shared/constants/routes';
import l from '../../assets/logo/imgs/background.png';
// import { useForm } from 'react-hook-form';

const Login: React.FC = (): JSX.Element => {
  // const {
  //   register, handleSubmit, control, formState: { errors },
  // } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xs" sx={{ transform: 'translate(0, 65%)' }}>
      <Grid
        container
        sx={{
          background: `no-repeat center url(${l})`,
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
        <Grid item xs={12}>
          <TextField
            sx={{ width: '100%' }}
            type="email"
            id="outlined-basic"
            label={<FormattedMessage id="app.login.email" />}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ mt: 2, mb: 2, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              <FormattedMessage id="app.login.password" />
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
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
          </FormControl>
        </Grid>
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
    </Container>
  );
};

export default Login;
