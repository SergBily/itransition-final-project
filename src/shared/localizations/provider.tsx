import React, { Fragment, ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import LOCALES from '../constants/locales';
import enMessages from './lang/en.json';
import ruMessages from './lang/ru.json';

interface I18ProviderProps {
  children: ReactNode,
  locale: string
}

const messages = {
  [LOCALES.ENGLISH]: enMessages,
  [LOCALES.RUSSIAN]: ruMessages,
};

const I18Provider = ({ children, locale }: I18ProviderProps): JSX.Element => (
  <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);

export default I18Provider;
