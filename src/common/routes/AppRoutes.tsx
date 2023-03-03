import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import routes from '../../shared/constants/routes';
import Home from '../../app/home/table/HomeTable';

const Login = loadable(() => import('../../app/auth/Login'), {
  resolveComponent: (components) => components.default,
});
const CollectionTable = loadable(
  () => import('../../app/allCollection/list/collectionTable/CollectionTable'),
  {
    resolveComponent: (components) => components.default,
  },
);

const EditCollection = loadable(() => import('../../app/allCollection/edit/EditCollection'), {
  resolveComponent: (components) => components.default,
});

const Signup = loadable(() => import('../../app/auth/Signup'), {
  resolveComponent: (components) => components.default,
});

const CollectionCreate = loadable(
  () => import('../../app/allCollection/creation/newCollection/NewCollection'),
  {
    resolveComponent: (components) => components.default,
  },
);

const ItemsTable = loadable(() => import('../../app/item/table/itemsTable/ItemsTable'), {
  resolveComponent: (components) => components.default,
});

const ItemCreate = loadable(() => import('../../app/item/creation/newItem/NewItem'), {
  resolveComponent: (components) => components.default,
});

const ItemEdit = loadable(() => import('../../app/item/edit/editItem/EditItem'), {
  resolveComponent: (components) => components.default,
});

const ItemPage = loadable(() => import('../../app/item/itemPage/ItemPage'), {
  resolveComponent: (components) => components.default,
});

const ReadItemsTable = loadable(() => import('../../app/home/readItemsTable/table/ReadItemsTable'), {
  resolveComponent: (components) => components.default,
});

const Admin = loadable(() => import('../../app/admin/adminPage/AdminPage'), {
  resolveComponent: (components) => components.default,
});

const AdminManageCollection = CollectionTable;
const AdminManageCreateCollection = CollectionCreate;
const AdminManageEditCollection = EditCollection;
const AdminManageItemsTable = ItemsTable;
const AdminManageItemCreate = ItemCreate;
const AdminManageItemEdit = ItemEdit;

const AppRoutes = () => (
  <Routes>
    <Route path={routes.HOME} element={<Home />} />
    <Route path={routes.LOGIN} element={<Login />} />
    <Route path={routes.SIGNUP} element={<Signup />} />
    <Route path={routes.COLLECTIONS} element={<CollectionTable />} />
    <Route path={routes.COLLECTION_CREATE} element={<CollectionCreate />} />
    <Route path={routes.COLLECTION_ID} element={<ItemsTable />} />
    <Route path={routes.COLLECTION_EDIT} element={<EditCollection />} />
    <Route path={routes.ITEM_CREATE} element={<ItemCreate />} />
    <Route path={routes.ITEM_EDIT} element={<ItemEdit />} />
    <Route path={routes.ITEM_PAGE} element={<ItemPage />} />
    <Route path={routes.COLLECTION_READ} element={<ReadItemsTable />} />
    <Route path={routes.ADMIN} element={<Admin />} />
    <Route path={routes.ADMIN_MANAGE_COLLECTION} element={<AdminManageCollection />} />
    <Route path={routes.ADMIN_COLLECTION_CREATE} element={<AdminManageCreateCollection />} />
    <Route path={routes.ADMIN_COLLECTION_EDIT} element={<AdminManageEditCollection />} />
    <Route path={routes.ADMIN_COLLECTION_ITEM} element={<AdminManageItemsTable />} />
    <Route path={routes.ADMIN_ITEM_CREATE} element={<AdminManageItemCreate />} />
    <Route path={routes.ADMIN_ITEM_EDIT} element={<AdminManageItemEdit />} />
  </Routes>
);

export default AppRoutes;
