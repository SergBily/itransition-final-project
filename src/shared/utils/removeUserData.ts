import localStorageKeys from '../constants/localStorageKeys';

const removeUserData = (): void => {
  localStorage.removeItem(localStorageKeys.USERId);
  localStorage.removeItem(localStorageKeys.TOKEN);
  localStorage.removeItem(localStorageKeys.NAME);
  localStorage.removeItem(localStorageKeys.ROLE);
};

export default removeUserData;
