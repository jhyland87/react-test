import { Header } from './Header'
import Account from './models/Account'
import { session } from './utils'
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react'

export const Overview = props => {
  const navigate = useNavigate();

  const username = session.getUsername();

  // If there's no session, then redirect to the login page
  useEffect(() => {
    if (! username) 
      navigate("/login");
  }, [username]);

  const accountData = username ? Account.getAccount(username) : null;
  console.log('accountData:',accountData)
  return (
    <div id="profile-container">
      <Header 
        //username={session.getUsername()} 
        //logInOutLink={loginLink}
        className="grid gap-5 md:grid-cols-2"/>

      <table id="overview-table">
        <thead>
          <tr>
            <th colSpan="2" style={{color: accountData?.color || "black"}} >{accountData?.name} Profile</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="overview-name">Name</td>
            <td className="overview-value">{accountData?.name}</td>
          </tr>
          <tr>
            <td className="overview-name">Phone number</td>
            <td className="overview-value">{accountData?.phone}</td>
          </tr>
          <tr >
            <td className="overview-name">E-mail</td>
            <td className="overview-value">{accountData?.email}</td>
          </tr>
        </tbody>
      </table>

      <div className="center-me">
         <Link to="/profile"
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"> 
        Edit Account
      </Link>
     
       <span className="pad-left-right text-sm"> | </span>
        <Link to="/delete"
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#"> 
        Delete Account
      </Link>
      </div>
    
        
    </div>
  )
}