const routes = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  COLLECTIONS: '/collection/all',
  COLLECTION_CREATE: '/collection/create',
  COLLECTION_DELETE: '/collection/delete',
  COLLECTION_EDIT: '/collection/edit/:id',
  COLLECTION: '/collection/',
  ITEM: '/item',
  COLLECTION_ID: '/collection/:id',
  COLLECTION_ITEMS: '/collection/:id/items',
  ITEM_CREATE: 'collection/:id/item/create',
  ITEM_DELETE: 'collection/:id/item/delete',
  ITEM_EDIT: '/collection/:id/edit/:itemId',
  ITEM_PAGE: '/collection/:id/item/:itemId',
  ADD_LIKE: '/item/like/add',
  REMOVE_LIKE: '/item/like/remove',
};

export default routes;
