
import { session } from './utils'
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react'

export const LogoutLink = props => {
  const navigate = useNavigate();

  const {sessionContext, setSessionContext} = useContext(props.context);

  const doLogout = e => {
    e.preventDefault()

    if ( sessionContext ){
      session.deauth()

      setSessionContext(false)

      navigate('/');    
    }
    else {
      console.log('Not logged in..', sessionContext)
    }
  }

  return (
    <Link onClick={doLogout}
      className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
      Logout
    </Link>
  )
}