import React, { useMemo, useState } from 'react';
import './App.scss';
import { Container } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { I18Provider, LOCALES } from './shared/localizations';
import GlobalContext from './shared/contexts/GlobalContext';
import localStorageKeys from './shared/constants/localStorageKeys';

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
      <I18Provider locale={LOCALES.ENGLISH}>
        <FormattedMessage id="app.header.search" />
        <Container />
      </I18Provider>
    </GlobalContext.Provider>
  );
};
export default App;
