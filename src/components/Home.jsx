import { session } from '../utils'
import { Link } from "react-router-dom";
import React from 'react'

export const Home = props => {
  //const {sessionContext, setSessionContext} = useContext(props.context);

  return (
    <div id="home-container" >     
      <div className="center-me">
        <Link 
          to={session.getUsername() ? '/logout' : '/login'}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
          {session.getUsername() ? 'Log out' : 'Log in'}
        </Link>  
       <span className="pad-left-right text-sm">or</span>
         <Link 
          to={session.getUsername() ? '/profile' : '/register'}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
          {session.getUsername() ? 'Edit Profile' : 'Create Account'}
        </Link>
      </div>
    </div>
  )
}