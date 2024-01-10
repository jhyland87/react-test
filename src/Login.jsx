
import { Header } from './Header'
import { Input } from './components'
import { FormProvider, useForm } from 'react-hook-form'
import {
  login_email_validation,
  login_password_validation,
} from './utils/inputValidations'
import { session } from './utils'
import React, { useState } from 'react'
import { BsFillCheckSquareFill, BsExclamationCircle } from 'react-icons/bs'
import { Link, useNavigate } from "react-router-dom";
import Account from './models/Account'



export const Login = props => {
  const methods = useForm()
  const navigate = useNavigate();

  const [success, setSuccess] = useState(props?.message || false)
  const [error, setError] = useState(props?.error || false)
  const [loginSuccess, setLoginSuccess] = useState(false)


    const showError = err => {
      setSuccess(false)
      setError(err)
    }

    const showSuccess = async message => {
      setError(false)
      setSuccess(message)
    }

  console.log('loginSuccess:', loginSuccess);

  //if ( props.action === 'logout' ) session.deauth()


  // This is to handle the redirect after login, which needs to be rendered
  // inside a react element/component
  const redirectRoute = r => navigate(r, { replace: true });

  const onSubmit = methods.handleSubmit(data => {
    let accountData = Account.verifyAccount(data)


    // If it returned an Error, then use that for the message
    if ( accountData instanceof Error ){
      //methods.reset()
      return showError( accountData.message )
    }

        // If the Account returned nothing, then take that as an error
    if ( accountData !== true ){
      //methods.reset()
      return showError('Login failed')
    }

    // Set cookie..
    session.loginAs(data.email);

    showSuccess( `Successfully logged in as ${data.email}!` )

    setLoginSuccess(true)
  })

  return (
    <FormProvider {...methods}>
      { loginSuccess && redirectRoute('/overview') }
      <Header className="grid gap-5 md:grid-cols-2"/>
      <form
        onSubmit={e => e.preventDefault()}
        noValidate
        autoComplete="off"
        className="login-container">
        {success && (
          <p className="font-semibold text-green-500 mb-5 flex items-center gap-1">
            <BsFillCheckSquareFill /> {success || 'Success'}
          </p>
        )}
        {error && (
          <p className="font-semibold text-red-500 mb-5 flex items-center gap-1">
            <BsExclamationCircle /> Error: {error}
          </p>
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <Input {...login_email_validation} />
          <Input {...login_password_validation} />
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <button
              onClick={onSubmit}
              className="p-5 rounded-md bg-blue-600 font-semibold text-white flex items-center gap-1 hover:bg-blue-800">
              Login
            </button>
            <Link to="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"> 
              Create a new account
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}