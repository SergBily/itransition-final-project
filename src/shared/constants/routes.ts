const routes = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  COLLECTIONS: '/collection/all',
  COLLECTION_CREATE: '/collection/create',
  COLLECTION_DELETE: '/collection/delete',
  COLLECTION: '/collection/',
  ITEM: '/item',
  COLLECTION_ID: '/collection/:id',
  ITEM_CREATE: 'collection/:id/item/create',
  ITEM_DELETE: 'collection/:id/item/delete',
  ITEM_EDIT: '/collection/:id/edit/:itemId',
  ITEM_PAGE: '/collection/:id/item/:itemId',
};

export default routes;
