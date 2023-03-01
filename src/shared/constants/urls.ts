const prod = 'https://final-project-itransition-s.herokuapp.com';
const dev = 'http://localhost:3001';

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
export const BASE_URL = config;

export const urls = {
  REGISTRATION: `${BASE_URL}/signup`,
  LOGOUT: `${BASE_URL}/logout`,
  LOGIN: `${BASE_URL}/login`,
  REFRESH: `${BASE_URL}/refresh`,
  COLLECTIONS: `${BASE_URL}/collection/all`,
  EDIT_COLLECTION: `${BASE_URL}/collection/edit`,
  NEW_COLLECTION: `${BASE_URL}/collection/create`,
  DELETE_COLLECTION: `${BASE_URL}/collection/delete`,
  COLLECTION: `${BASE_URL}/collection`,
  ALL_ITEMS: `${BASE_URL}/item/all`,
  NEW_ITEM: `${BASE_URL}/item/create`,
  DELETE_ITEM: `${BASE_URL}/item/delete`,
  EDIT_ITEM: `${BASE_URL}/item/edit`,
  ITEM: `${BASE_URL}/item`,
  ADD_LIKE: `${BASE_URL}/item/like/add`,
  REMOVE_LIKE: `${BASE_URL}/item/like/remove`,
  COMMENTS_ITEM: `${BASE_URL}/comment/all`,
};
