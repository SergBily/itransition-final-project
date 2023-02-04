import React, { useMemo, useState } from 'react';
import './App.scss';
import { Container, Grid } from '@mui/material';
import { I18Provider, LOCALES } from './shared/localizations';
import GlobalContext from './shared/contexts/GlobalContext';
import localStorageKeys from './shared/constants/localStorageKeys';
import AppRoutes from './common/routes/AppRoutes';
import Content from './common/content/Content';
import Header from './common/header/Header';

const App = (): JSX.Element => {
  const [currentLocale, setCurrentLocale] = useState<string>(
    localStorage.getItem(localStorageKeys.LOCALE) ?? LOCALES.ENGLISH,
  );

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
            sx={{
              minWidth: '100vw',
              backgroundColor: '#0062993d',
              boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%),
                          0px 4px 5px 0px rgb(0 0 0 / 14%),
                          0px 1px 10px 0px rgb(0 0 0 / 12%)`,
            }}
            item
            xs={12}
          >
            <Container maxWidth="xl" sx={{ padding: 0 }}>
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
      </I18Provider>
    </GlobalContext.Provider>
  );
};
export default App;
