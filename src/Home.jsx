import { Header } from './Header'
import { session } from './utils'
import { Link } from "react-router-dom";

export const Home = props => {
  return (
    <div id="home-container" >
     
      <Header 
        //username={session.getUsername()} 
        //logInOutLink={loginLink}
        className="grid gap-5 md:grid-cols-2"/>
     
      <div className="center-me">
        <Link 
          to={session.getUsername() ? '/logout' : '/login'}
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
          {session.getUsername() ? 'Log out' : 'Log in'}
        </Link>  
       <span className="pad-left-right text-sm">or</span>
         <Link 
          to="/profile"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" >
          {session.getUsername() ? 'Edit Profile' : 'Create Account'}
        </Link>
      </div>
        
    </div>
  )
}