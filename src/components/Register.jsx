import { Input } from './'
import { FormProvider, useForm } from 'react-hook-form'
import {
  name_validation,
  color_validation,
  email_validation,
  phone_validation,
  password_validation,
  password2_validation
} from '../utils/inputValidations'
import { Link,  useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react'
import { BsFillCheckSquareFill, BsExclamationCircle } from 'react-icons/bs'
import Account from '../models/Account'

export const Register = props => {
  const { setSessionContext } = useContext(props.context);
  const navigate = useNavigate();
  const methods = useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onSubmit = methods.handleSubmit(data => {
    if (  data.password &&  data.password2 && data.password !== data.password2 ){
      window.scrollTo(0, 0);
      return setError(`The passwords do not match`)
    }

    // Check if the account already exists
    if ( Account.getAccount( data.email )){
      window.scrollTo(0, 0);
      return setError(`An account with ${data.email} already exists`) 
    }

    // Create a new account
    const account = new Account(data)

    account.save();

    methods.reset()
    setSuccess(`An account with ${data.email} has been created!..`)
    setError(false)

    setSessionContext(data.email)
    setTimeout(() => navigate('/overview', { replace: true }), 500);
  })

  return (
    <FormProvider {...methods}>
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
        {success && (
          <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
            <BsFillCheckSquareFill /> {success}
          </p>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <Input {...name_validation} autoFocus />
          <Input {...email_validation} />
          <Input {...phone_validation} />
          <Input {...color_validation}  />
          <Input {...password_validation} />
          <Input {...password2_validation} />
        </div>
        <div className="mt-5">
         
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