import React, { useMemo, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { I18Provider, LOCALES } from './shared/localizations';
import GlobalContext from './shared/contexts/GlobalContext';
import localStorageKeys from './shared/constants/localStorageKeys';
import AppRoutes from './common/routes/AppRoutes';
import Content from './common/content/Content';
import Header from './common/header/Header';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.scss';
import { useAppDispatch } from './shared/hooks/hooks';
import { initStateUser } from './redux/features/authSlice';

const App: React.FC = (): JSX.Element => {
  const [currentLocale, setCurrentLocale] = useState<string>(
    localStorage.getItem(localStorageKeys.LOCALE) ?? LOCALES.ENGLISH,
  );
  const initUser = {
    userId: localStorage.getItem(localStorageKeys.USERId) ?? '',
    token: localStorage.getItem(localStorageKeys.TOKEN) ?? '',
    name: localStorage.getItem(localStorageKeys.NAME) ?? '',
    role: localStorage.getItem(localStorageKeys.ROLE) ?? '',
  };
  const dispatch = useAppDispatch();
  dispatch(initStateUser(initUser));

  const setLocale = (value: string): void => {
    setCurrentLocale(value);
    localStorage.setItem(localStorageKeys.LOCALE, value);
  };

  const valueContext = useMemo(() => ({
    currentLocale,
    setCurrentLocale: setLocale,
  }), [currentLocale]);

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
