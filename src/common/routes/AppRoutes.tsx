import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import routes from '../../shared/constants/routes';
import Home from '../../app/home/Home';

const Login = loadable(() => import('../../app/auth/Login'), {
  resolveComponent: (components) => components.default,
});
const CollectionTable = loadable(
  () => import('../../app/allCollection/list/collectionTable/CollectionTable'),
  {
    resolveComponent: (components) => components.default,
  },
);

const Signup = loadable(() => import('../../app/auth/Signup'), {
  resolveComponent: (components) => components.default,
});

const CollectionCreate = loadable(
  () => import('../../app/allCollection/creation/newCollection/NewCollection'),
  {
    resolveComponent: (components) => components.default,
  },
);

const Collection = loadable(() => import('../../app/item/table/itemsTable/ItemsTable'), {
  resolveComponent: (components) => components.default,
});

const ItemCreate = loadable(() => import('../../app/item/creation/newItem/NewItem'), {
  resolveComponent: (components) => components.default,
});

const AppRoutes = () => (
  <Routes>
    <Route path={routes.HOME} element={<Home />} />
    <Route path={routes.LOGIN} element={<Login />} />
    <Route path={routes.SIGNUP} element={<Signup />} />
    <Route path={routes.COLLECTIONS} element={<CollectionTable />} />
    <Route path={routes.COLLECTION_CREATE} element={<CollectionCreate />} />
    <Route path={routes.COLLECTION_ID} element={<Collection />} />
    <Route path={routes.ITEM_CREATE} element={<ItemCreate />} />
  </Routes>
);

export default AppRoutes;
