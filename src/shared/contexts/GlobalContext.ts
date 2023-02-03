import { createContext } from 'react';
import { LOCALES } from '../localizations';

type GlobalContextType = {
  currentLocale: string,
  setCurrentLocale: ((v: string) => void) | null
};

const GlobalContext = createContext<GlobalContextType>({
  currentLocale: LOCALES.ENGLISH,
  setCurrentLocale: null,
});

export default GlobalContext;
