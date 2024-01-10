import React from 'react';
import './assets/index.css'
import { Login } from './Login';
import { Logout } from './Logout';
import { Delete } from './Delete';
import { Register } from './Register';
import { Profile } from './Profile';
import { Overview } from './Overview';
import { Home } from './Home';
//import { PrivateRoute } from './PrivateRoute';
//import { Header } from './Header'

//import Cookies from 'js-cookie'

import {
  createBrowserRouter,
  //BrowserRouter
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    //element: <Login onFormSwitch={toggleForm} />,
    element: <Login />
  },
  {
    path: '/logout',
    //element: <Login onFormSwitch={toggleForm} />,
    element: <Logout />
  },
  {
    path: '/timeout',
    //element: <Login onFormSwitch={toggleForm} />,
    element: <Login error="Session timed out"/>,
  },
  {
    path: '/overview',
    element: <Overview />,
  },  
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/delete',
    element: <Delete />,
  }
]);

function App() {
  return (
    <div className="main-container">      
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
