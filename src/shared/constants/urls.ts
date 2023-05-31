import BASE_URL from './baseUrls';

const urls = {
  REGISTRATION: 'signup',
  LOGOUT: 'logout',
  LOGIN: 'login',
  REFRESH: `${BASE_URL}/refresh`,
  COLLECTIONS: `${BASE_URL}/collection/all`,
  EDIT_COLLECTION: `${BASE_URL}/collection/edit`,
  NEW_COLLECTION: `${BASE_URL}/collection/create`,
  DELETE_COLLECTION: `${BASE_URL}/collection/delete`,
  COLLECTION: `${BASE_URL}/collection`,
  ALL_ITEMS: `${BASE_URL}/item/all`,
  NEW_ITEM: `${BASE_URL}/item/create`,
  LAST_ITEMS: 'item/home/last',
  DELETE_ITEM: `${BASE_URL}/item/delete`,
  EDIT_ITEM: `${BASE_URL}/item/edit`,
  TAGS_ITEM: `${BASE_URL}/item/cloud/tags`,
  ITEM: `${BASE_URL}/item`,
  ADD_LIKE: `${BASE_URL}/item/like/add`,
  REMOVE_LIKE: `${BASE_URL}/item/like/remove`,
  COMMENTS_ITEM: `${BASE_URL}/comment/all`,
  LARGEST_COLLECTIONS: 'collection/home/largest',
  ALL_USERS: `${BASE_URL}/admin/users`,
  DELETE_USERS: `${BASE_URL}/admin/users/delete`,
  STATUS_USERS: `${BASE_URL}/admin/users/status`,
  ROLE_USERS: `${BASE_URL}/admin/users/role`,
};

export default urls;
