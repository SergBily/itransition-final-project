import React from 'react';
import './App.scss';
import { Container } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { I18Provider, LOCALES } from './shared/localizations';

const App = (): JSX.Element => (
  <I18Provider locale={LOCALES.ENGLISH}>
    <FormattedMessage id="app.header.search" />
    <Container />
  </I18Provider>
);
export default App;
