import localStorageKeys from '../constants/localStorageKeys';
import { AuthData } from '../models';

const setUserData = (payload: AuthData): void => {
  localStorage.setItem(localStorageKeys.USERId, payload.userId);
  localStorage.setItem(localStorageKeys.TOKEN, payload.token);
  localStorage.setItem(localStorageKeys.NAME, payload.name);
  localStorage.setItem(localStorageKeys.ROLE, payload.role);
};

export default setUserData;
