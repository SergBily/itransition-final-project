import React, { FunctionComponent, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthForm, ErrorMessage } from '../../../shared/models';
import { initUserState } from '../../../redux/features';
import {
  authApi, toastConfig, cacheKeys, routes,
  useAppDispatch, resetState,
} from '../../../shared';
import {
  AuthAddInformation,
  AuthBtnSubmit, AuthField, AuthFieldPassword, AuthTitle, Spinner,
} from '../../../common';
import styles from './styles.module.scss';

const Login: FunctionComponent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<AuthForm>();
  const [setLogin, {
    data, isSuccess, error, isError, isLoading,
  }] = authApi.useLoginMutation({ fixedCacheKey: cacheKeys.AUTH.LOGIN });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(initUserState(data));
      toast.success(<FormattedMessage
        id="app.login.success"
        values={{ name: data.name }}
      />, toastConfig);
      navigate(routes.HOME);
    }
    if (isError) {
      toast.warn(<FormattedMessage
        id={`${(error as ErrorMessage).message}`}
      />, toastConfig);
    }
    dispatch(resetState());
  }, [isSuccess, isError]);

  const onFormSubmit = (dataForm: AuthForm): void => {
    setLogin(dataForm);
  };

  return (
    <Container maxWidth="xs" className={styles.container}>
      <Grid container className={styles.root}>
        <AuthTitle />
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className={styles.form}
        >
          <AuthField
            typeName="email"
            register={register}
            errors={errors}
          />
          <AuthFieldPassword
            register={register}
            errors={errors}
          />
          <AuthBtnSubmit label="login" />
        </form>
        <AuthAddInformation label="login" />
      </Grid>
      {isLoading && <Spinner />}
    </Container>
  );
};

export default Login;
