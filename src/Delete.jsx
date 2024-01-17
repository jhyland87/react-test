import Account from './models/Account'
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react'
import { session } from './utils'

export const Delete = props => {
  const navigate = useNavigate();
  const {sessionContext, setSessionContext} = useContext(props.context);

  const [success, setSuccess] = useState(props?.message || false)
  const [error, setError] = useState(props?.error || false)

  const showError = err => {
    setSuccess(false)
    setError(err)
  }

  const showSuccess = async message => {
    setError(false)
    setSuccess(message)
  }

  let message
  if ( ! sessionContext || typeof sessionContext !== 'object'){
    message = 'You must first login before you can delete your account (duh..)'
  }
  else {
    message = 'Deleting your account..'

    setTimeout(()=>{
      sessionContext.delete()

      setSessionContext(false)
      navigate('/', { replace: true })
    }, 500)
  }

  return (
    <div id="profile-container">     
      <p className="font-semibold text-green-500 mb-5 flex items-center gap-1 center-me">
        {message}
      </p>
    </div>
  )
}