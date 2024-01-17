import React, { createContext, useState } from 'react';
import './assets/index.css'
import Account from './models/Account'
import { Login } from './Login';
import { Logout } from './Logout';
import { Delete } from './Delete';
import { Register } from './Register';
import { Profile } from './Profile';
import { Overview } from './Overview';
import { Home } from './Home';
import { Header } from './Header'
import { session } from './utils'
import { config } from './config'
import {
  Route, Routes,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  const [sessionContext, _setSessionContext] = useState( session.getUsername() ? Account.getAccount(session.getUsername()) : false )

  const [loginTimeout, setLoginTimeout] = useState(null)

  // Function to handle the login/logout
  const setSessionContext = user => {
    // If its falsey, then just deauth any session and empty the context
    if ( ! user ){
      session.deauth() 
      _setSessionContext(false)

      if ( loginTimeout ){
        clearTimeout(loginTimeout);
        setLoginTimeout(null)
      }
      return;
    }

    // Assume the pw validation was already done in the login form action..
    // And just grab the account info.
    const account = Account.getAccount(user)

    if ( ! account ){
      console('Failed to get account for ', user)
      _setSessionContext(false)
      return
    }

    // Set the cookie
    session.loginAs(user);

    setLoginTimeout(setTimeout(() => {
      console.log('Timeout..')

      window.location = '/timeout'
    }, config.session.timeout * 1000))

    console.log('setting session context as:', account)
    // Set the session context to the users object
    _setSessionContext(account)
  }

  const SessionContext = createContext(sessionContext);

  return (
    <Router>   
      <SessionContext.Provider value={{ sessionContext, setSessionContext }}>
        <div className="App">
          <Header 
            className="grid gap-5 md:grid-cols-2"
            context={ SessionContext } />
          <Routes>
            <Route path="/"         element={ <Home context={ SessionContext } /> }      />
            <Route path="/login"    element={ <Login context={ SessionContext } /> }     />
            <Route path="/logout"   element={ <Logout context={ SessionContext } /> }    />
            <Route path="/register" element={ <Register context={ SessionContext } /> }  />
            <Route path="/overview" element={ <Overview context={ SessionContext } /> }  />
            <Route path="/profile"  element={ <Profile context={ SessionContext } /> }   />
            <Route path="/delete"   element={ <Delete context={ SessionContext } /> }    />
            <Route path="/timeout"  element={ <Login context={ SessionContext } error="Session timed out"/> }   />
          </Routes>
        </div>
      </SessionContext.Provider>
    </Router>
  );
}

export default App;
