import localStorageKeys from '../constants/localStorageKeys';
import LocalStorageData from '../models/localStorageData';

const setUserData = (payload: LocalStorageData): void => {
  localStorage.setItem(localStorageKeys.USERId, payload.userId);
  localStorage.setItem(localStorageKeys.TOKEN, payload.token);
  localStorage.setItem(localStorageKeys.NAME, payload.name);
};

export default setUserData;
