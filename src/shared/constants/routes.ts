const routes = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  COLLECTIONS: '/collection/all',
  COLLECTION_CREATE: '/collection/create',
  COLLECTION_DELETE: '/collection/delete',
  COLLECTION_EDIT: '/collection/edit/:id',
  COLLECTION_LARGEST: '/collection/largest',
  COLLECTION_READ(id: string) {
    return `${this.COLLECTION}read/${id}`;
  },
  COLLECTION: '/collection/',
  ITEM: '/item/',
  COLLECTION_ID: '/collection/:id',
  COLLECTION_ITEMS: '/collection/:id/items',
  ITEM_CREATE: 'collection/:id/item/create',
  ITEM_DELETE: 'collection/:id/item/delete',
  ITEM_EDIT: '/collection/:id/edit/:itemId',
  ITEM_READ(collectionId: string, itemId: string) {
    return `${this.COLLECTION}${collectionId}${this.ITEM}${itemId}`;
  },
  LAST_ITEMS: '/item/home/last',
  TAGS_ITEMS: '/item/cloud/tags',
  ADD_LIKE: '/item/like/add',
  REMOVE_LIKE: '/item/like/remove',
  ADMIN: '/admin/users',
  USER_DELETE: 'admin/user/delete',
  USER_STATUS: 'admin/user/status',
  USER_ROLE: 'admin/user/role',
  ADMIN_MANAGE_COLLECTION: '/collection/all/:id',
  ADMIN_COLLECTION_CREATE: '/collection/create/:id',
  ADMIN_COLLECTION_EDIT: '/collection/edit/:id/:manageId',
  ADMIN_COLLECTION_ITEM: '/collection/:id/:manageId',
  ADMIN_ITEM_EDIT: '/collection/:id/edit/:itemId/:manageId',
  ADMIN_ITEM_CREATE: 'collection/:id/item/create/:manageId',
};

export default routes;
