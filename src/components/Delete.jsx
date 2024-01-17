import { useNavigate } from "react-router-dom";
import React, { useContext } from 'react'
import { BsFillCheckSquareFill, BsExclamationCircle } from 'react-icons/bs'

export const Delete = props => {
  const navigate = useNavigate();
  const {sessionContext, setSessionContext} = useContext(props.context);
  let success, error;

  if ( ! sessionContext || typeof sessionContext !== 'object'){
    success = null
    error = 'You must first login before you can delete your account (duh..)'
  }
  else {
    success = 'Deleting your account..'
    error = null

    setTimeout(()=>{
      sessionContext.delete()

      setSessionContext(false)
      navigate('/', { replace: true })
    }, 500)
  }

  return (
    <div id="profile-container" className="flex items-center justify-between">  
      {error && (
        <p className="font-semibold text-red-500 mb-5 flex items-center gap-1 center-margin">
          <BsExclamationCircle /> Error: {error}
        </p>
      )}
      {success && (
        <p className="font-semibold text-green-500 mb-5 flex items-center gap-1 center-margin">
          <BsFillCheckSquareFill /> {success}
        </p>
      )}
    </div>
  )
}