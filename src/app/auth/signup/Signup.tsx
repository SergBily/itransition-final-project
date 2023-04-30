import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthForm } from '../../../shared/models';
import { initUserState } from '../../../redux/features';
import {
  AuthAddInformation, AuthBtnSubmit, AuthField,
  AuthFieldPassword, AuthTitle, Spinner,
} from '../../../common';
import {
  toastConfig, authApi, resetState,
  cacheKeys, routes, useAppDispatch,
} from '../../../shared';
import styles from './styles.module.scss';

const Signup: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register, handleSubmit, formState: { errors },
  } = useForm<AuthForm>();
  const [setRegistration, {
    data: dataRegistration, isSuccess, isError, isLoading,
  }] = authApi.useRegistrationMutation({ fixedCacheKey: cacheKeys.AUTH.REGISTRATION });

  useEffect(() => {
    if (isSuccess && dataRegistration) {
      dispatch(initUserState(dataRegistration));
      toast.success(<FormattedMessage
        id="app.signup.success"
        values={{ name: dataRegistration.name }}
      />, toastConfig);
      navigate(routes.HOME);
    }
    if (isError) {
      toast.warn(<FormattedMessage id="app.signup.errors5" />, toastConfig);
    }
    dispatch(resetState());
  }, [isSuccess, isError]);

  const onFormSubmit = (data: AuthForm): void => {
    setRegistration((data));
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
            typeName="name"
            register={register}
            errors={errors}
          />
          <AuthField
            typeName="email"
            register={register}
            errors={errors}
          />
          <AuthFieldPassword
            register={register}
            errors={errors}
          />
          <AuthBtnSubmit label="signup" />
        </form>
        <AuthAddInformation label="signup" />
      </Grid>
      {isLoading && <Spinner />}
    </Container>
  );
};

export default Signup;
