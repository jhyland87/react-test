//import { Header } from './Header'
import { Input } from './components'
import { FormProvider, useForm } from 'react-hook-form'
import {
  name_validation,
  color_validation,
  email_validation,
  phone_validation,
  password_validation,
  password2_validation
} from './utils/inputValidations'
import Account from './models/Account'
import { session } from './utils'

import { Link, useNavigate } from "react-router-dom";

import React, { useState, useEffect, useContext } from 'react'
import { BsFillCheckSquareFill, BsExclamationCircle } from 'react-icons/bs'

export const Profile = props => {
  const {sessionContext, setSessionContext} = useContext(props.context);

  const methods = useForm()
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const showSuccess = async message => {
    setError(false)
    setSuccess(message)
  }

  const onSubmit = methods.handleSubmit(data => {
    // Create the new account object with the updated info..
    const newAccountObj = new Account(data)

    // Save it (which just overrides the existing  one in the localStorage)
    newAccountObj.save();

    // Then update the session context (which will re-fetch the account object)
    setSessionContext(data.email)

    //methods.reset()
    showSuccess(`Your account has been updated!`)

    setTimeout(() => navigate('/overview', { replace: true }), 1000)

  })

  // If there is no active session, then just redirect
  if (  sessionContext === false || typeof sessionContext !== 'object' ){
    setTimeout(() => navigate('/login', { replace: true }), 10)
    return
  } 

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={e => e.preventDefault()}
        noValidate
        autoComplete="off"
        className="profile-container">
        <p className="font-semibold text-black-500 mb-5 flex items-center center-me gap-1">
          Edit {sessionContext?.name?.toUpperCase()}'s Profile
        </p>
        {error && (
          <p className="font-semibold text-red-500 mb-5 flex items-center gap-1">
            <BsExclamationCircle /> Error: {error}
          </p>
        )}
        {success && (
          <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
            <BsFillCheckSquareFill /> {success}
          </p>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <Input {...name_validation} defaultValue={(sessionContext?.name || '')} />
          <Input {...email_validation} defaultValue={(sessionContext?.email || '')} />
          <Input {...phone_validation} defaultValue={(sessionContext?.phone || '')} />
          <Input {...color_validation} defaultValue={(sessionContext?.color || '')} />
          <Input {...password_validation} defaultValue={(sessionContext?.password || '')} />
          <Input {...password2_validation}  defaultValue={(sessionContext?.password || '')} />
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <button
              onClick={onSubmit}
              className="p-5 rounded-md bg-blue-600 font-semibold text-white flex items-center gap-1 hover:bg-blue-800">
              { sessionContext ? "Update" : "Create" } Account
            </button>
            <Link to="/overview"
              className="inline-block align-baseline font-bold text-sm text-black-500 hover:text-black-800" href="#"> 
              Cancel
            </Link>
          </div>
        </div>
      </form>
      
    </FormProvider>
  )
}