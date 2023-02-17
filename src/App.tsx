import React, { useMemo, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { I18Provider, LOCALES } from './shared/localizations';
import GlobalContext from './shared/contexts/GlobalContext';
import localStorageKeys from './shared/constants/localStorageKeys';
import AppRoutes from './common/routes/AppRoutes';
import Content from './common/content/Content';
import Header from './common/header/Header';
import { AuthResponse } from './shared/models/authResponse.model';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.scss';

const App: React.FC = (): JSX.Element => {
  const [currentLocale, setCurrentLocale] = useState<string>(
    localStorage.getItem(localStorageKeys.LOCALE) ?? LOCALES.ENGLISH,
  );
  const [isToken, setIsToken] = useState<boolean>(
    !!localStorage.getItem(localStorageKeys.TOKEN),
  );
  const [userId, setuserId] = useState<string>(
    localStorage.getItem(localStorageKeys.USERId) ?? '',
  );

  const setLocale = (value: string): void => {
    setCurrentLocale(value);
    localStorage.setItem(localStorageKeys.LOCALE, value);
  };

  const setUserData = (payload: AuthResponse): void => {
    setIsToken(true);
    setuserId(payload.user.id);
    localStorage.setItem(localStorageKeys.USERId, payload.user.id);
    localStorage.setItem(localStorageKeys.TOKEN, payload.accessToken);
    localStorage.setItem(localStorageKeys.NAME, payload.user.name);
  };

  const removeUserData = (): void => {
    setIsToken(false);
    setuserId('');
    localStorage.removeItem(localStorageKeys.USERId);
    localStorage.removeItem(localStorageKeys.TOKEN);
    localStorage.removeItem(localStorageKeys.NAME);
  };

  const valueContext = useMemo(() => ({
    currentLocale,
    isToken,
    userId,
    setUserData,
    removeUserData,
    setCurrentLocale: setLocale,
  }), [currentLocale, userId, isToken]);

  return (
    <GlobalContext.Provider value={valueContext}>
      <I18Provider locale={currentLocale}>

        <Grid container>
          <Grid
            className={styles.gridHeader}
            item
            xs={12}
          >
            <Container
              maxWidth="xl"
              sx={{ p: 0 }}
            >
              <Header />
            </Container>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Container maxWidth="xl">
              <Content>
                <AppRoutes />
              </Content>
            </Container>
          </Grid>
        </Grid>
        <ToastContainer />
      </I18Provider>
    </GlobalContext.Provider>
  );
};
export default App;
