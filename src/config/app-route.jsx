import React from 'react';
import App from './../app.jsx';

import Home from './../pages/home/home.jsx';
import Error from './../pages/error/error.js';
import Users from '../pages/users/users.jsx';
import Services from '../pages/servicesHub/services.jsx';
import Pets from '../pages/pets/pets.jsx';

import Products from '../pages/products/products.jsx';
import Owners from '../pages/owners/owners.jsx';
import Billing from '../pages/pays/billing.jsx';
import OrdersPage from '../pages/orders/orders.jsx';
import AppoinmentsPage from '../pages/appointments/apponments.jsx';
import Login from '../auth/login/login.jsx';
import Register from '../auth/register/register.jsx';

const AppRoute = [
  {
    path: '*', 
    element: <App />,
    children: [
      { path: '', element: <Login /> },
      { path: 'register', element: <Register /> },
    	{ path: 'home', element: <Home /> },
      { path: 'users', element: <Users /> },
      { path: 'service', element: <Services /> },
    	{ path: '*', element: <Error /> },
      { path: 'pets', element: <Pets /> },
      { path: 'products', element: <Products /> },
      { path: 'owners', element: <Owners /> }, 
      { path: 'pay', element: <Billing /> },
      { path: 'orders', element: <OrdersPage /> }, 
      { path: 'appointments', element: <AppoinmentsPage /> },  
		]
  }
];


export default AppRoute;