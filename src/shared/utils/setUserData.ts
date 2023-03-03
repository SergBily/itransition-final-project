import localStorageKeys from '../constants/localStorageKeys';
import LocalStorageData from '../models/localStorageData.model';

const setUserData = (payload: LocalStorageData): void => {
  localStorage.setItem(localStorageKeys.USERId, payload.userId);
  localStorage.setItem(localStorageKeys.TOKEN, payload.token);
  localStorage.setItem(localStorageKeys.NAME, payload.name);
  localStorage.setItem(localStorageKeys.ROLE, payload.role);
};

export default setUserData;
