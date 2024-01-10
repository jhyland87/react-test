import { Header } from './Header'
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

import React, { useState, useEffect } from 'react'
import { BsFillCheckSquareFill, BsExclamationCircle } from 'react-icons/bs'

export const Profile = props => {
  const methods = useForm()
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [redirectTo, setRedirect] = useState(false)



  const account = session.getUsername() 
    ? Account.getAccount(session.getUsername())
    : false

  const showSuccess = async message => {
    setError(false)
    setSuccess(message)
  }

  //const redirectRoute = r => (r ? navigate(r, { replace: true }) : '');
  
  const onSubmit = methods.handleSubmit(data => {
    const account = new Account(data)
    account.save();

    //methods.reset()
    showSuccess(`An account with ${data.email} has been created!`)

    setRedirect('/overview')
  })

  useEffect(() => {
    navigate(redirectTo);    
  }, [redirectTo]);


  return (
    <FormProvider {...methods}>
      
      <Header 
        //username={session.getUsername()} 
        //logInOutLink={loginLink}
        className="grid gap-5 md:grid-cols-2"/>
      <form
        onSubmit={e => e.preventDefault()}
        noValidate
        autoComplete="off"
        className="profile-container">
        <p className="font-semibold text-black-500 mb-5 flex items-center center-me gap-1">
          Edit {account?.name?.toUpperCase()}'s Profile
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
          <Input {...name_validation} defaultValue={(account?.name || '')} />
          <Input {...email_validation} defaultValue={(account?.email || '')} />
          <Input {...phone_validation} defaultValue={(account?.phone || '')} />
          <Input {...color_validation} defaultValue={(account?.color || '')} />
          <Input {...password_validation} defaultValue={(account?.password || '')} />
          <Input {...password2_validation}  defaultValue={(account?.password || '')} />
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <button
              onClick={onSubmit}
              className="p-5 rounded-md bg-blue-600 font-semibold text-white flex items-center gap-1 hover:bg-blue-800">
              { account ? "Update" : "Create" } Account
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