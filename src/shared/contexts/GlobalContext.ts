import { createContext } from 'react';
import { LOCALES } from '../localizations';
import { AuthResponse } from '../models/authResponse.model';

type GlobalContextType = {
  currentLocale: string,
  setCurrentLocale?: ((v: string) => void),
  isToken: boolean,
  userId: string,
  setUserData?: ((v: AuthResponse) => void),
  removeUserData?: (() => void)
};

const GlobalContext = createContext<GlobalContextType>({
  currentLocale: LOCALES.ENGLISH,
  isToken: false,
  userId: '',
});

export default GlobalContext;
