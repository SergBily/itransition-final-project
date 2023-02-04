import { createContext } from 'react';
import { LOCALES } from '../localizations';

type GlobalContextType = {
  currentLocale: string,
  setCurrentLocale?: ((v: string) => void)
};

const GlobalContext = createContext<GlobalContextType>({
  currentLocale: LOCALES.ENGLISH,
});

export default GlobalContext;
