import React from 'react';
import App from './../app.jsx';

import Home from './../pages/home/home.jsx';
import Error from './../pages/error/error.js';
import Users from '../pages/users/users.jsx';
import Services from '../pages/servicesHub/services.jsx';
import Pets from '../pages/pets/pets.jsx';

const AppRoute = [
  {
    path: '*', 
    element: <App />,
    children: [
    	{ path: '', element: <Home /> },
      { path: 'users', element: <Users /> },
      { path: 'service', element: <Services /> },
    	{ path: '*', element: <Error /> },
      { path: 'pets', element: <Pets /> },      
		]
  }
];


export default AppRoute;