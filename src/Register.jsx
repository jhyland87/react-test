import { Input } from './components'
import { Header } from './Header'
import { FormProvider, useForm } from 'react-hook-form'
import {
  name_validation,
  color_validation,
  email_validation,
  phone_validation,
  password_validation,
  password2_validation
} from './utils/inputValidations'
import { Link,  useNavigate } from "react-router-dom";

import React, { useState, useEffect } from 'react'
import { BsFillCheckSquareFill, BsExclamationCircle } from 'react-icons/bs'


import Account from './models/Account'

export const Register = props => {
  const navigate = useNavigate();

  const [redirectTo, setRedirect] = useState(false)


  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = methods.handleSubmit(data => {
    console.log('data:',data)

    if ( data.password !== data.password2 ){
      return setError(`The passwords do not match`)
    }

    // Check if the account already exists
    if ( Account.getAccount( data.email )){
      return setError(`An account with ${data.email} already exists`) 
    }

    // Create a new account
    const account = new Account(data)

    console.log('Phone:', account.phone)

    account.save();
    console.log('Phone:', account.phone)

    methods.reset()
    setSuccess(`An account with ${data.email} has been created!`)
    setError(false)
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
        className="profile-container"
      >
        {error && (
        <p className="font-semibold text-red-500 mb-5 flex items-center gap-1">
          <BsExclamationCircle /> Error: {error}
        </p>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <Input {...name_validation} />
          <Input {...email_validation} />
          <Input {...phone_validation} />
          <Input {...color_validation}  />
          <Input {...password_validation} />
          <Input {...password2_validation} />
        </div>
        <div className="mt-5">
          {success && (
            <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
              <BsFillCheckSquareFill /> {success}
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              onClick={onSubmit}
              className="p-5 rounded-md bg-blue-600 font-semibold text-white flex items-center gap-1 hover:bg-blue-800">
              Create Account
            </button>
            <Link to="/login"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"> 
              Login
            </Link>

          </div>
        </div>
      </form>
      
    </FormProvider>
  )
}