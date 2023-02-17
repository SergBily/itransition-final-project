import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import routes from '../../shared/constants/routes';
import Home from '../../app/home/Home';

const Login = loadable(() => import('../../app/auth/Login'), {
  resolveComponent: (components) => components.default,
});
const Collections = loadable(() => import('../../app/collection/list/CollectionTable'), {
  resolveComponent: (components) => components.default,
});

const Signup = loadable(() => import('../../app/auth/Signup'), {
  resolveComponent: (components) => components.default,
});

const CollectionCreate = loadable(() => import('../../app/collection/creation/newCollection/NewCollection'), {
  resolveComponent: (components) => components.default,
});

const AppRoutes = () => (
  <Routes>
    <Route path={routes.HOME} element={<Home />} />
    <Route path={routes.LOGIN} element={<Login />} />
    <Route path={routes.SIGNUP} element={<Signup />} />
    <Route path={routes.COLLECTIONS} element={<Collections />} />
    <Route path={routes.COLLECTIONCREATE} element={<CollectionCreate />} />
  </Routes>
);

export default AppRoutes;
