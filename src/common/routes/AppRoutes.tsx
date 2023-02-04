import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import loadable from '@loadable/component';
import routes from '../../shared/constants/routes';
import Home from '../../app/home/Home';

// const Home = loadable(() => import('../../app/home/Home'), {
//   resolveComponent: (components) => components.default,
// });

const AppRoutes = () => (
  <Routes>
    <Route path={routes.HOME} element={<Home />} />
  </Routes>
);

export default AppRoutes;
