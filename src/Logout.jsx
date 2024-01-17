
import { session } from './utils'
import React, { useState, useContext } from 'react'

export const Logout = props => {
  const {sessionContext, setSessionContext} = useContext(props.context);

  let message;

  if ( sessionContext ){
    message = `Logged out of ${sessionContext} (${session.getUsername()})...`

    setSessionContext(false)
  }
  else {
    message = "Must be logged in to log out...";
  }

  return (
    <div>
      <div className=" center-me">{ message }</div>
    </div>
  )
}