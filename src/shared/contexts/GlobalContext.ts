import { createContext } from 'react';
import { LOCALES } from '../localizations';

type GlobalContextType = {
  currentLocale: string,
  setCurrentLocale?: ((v: string) => void),
  isLogin: boolean,
  setIsLogin?: ((v: boolean) => void),
};

const GlobalContext = createContext<GlobalContextType>({
  currentLocale: LOCALES.ENGLISH,
  isLogin: false,
});

export default GlobalContext;
