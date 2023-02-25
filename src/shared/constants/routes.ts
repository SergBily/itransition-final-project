const routes = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  COLLECTIONS: '/collection/all',
  COLLECTION_CREATE: '/collection/create',
  COLLECTION_DELETE: '/collection/delete',
  COLLECTION: '/collection/',
  COLLECTION_ID: '/collection/:id',
  ITEM_CREATE: 'collection/:id/item/create',
  ITEM_DELETE: 'collection/:id/item/delete',
};

export default routes;
