import Cookies from 'js-cookie'
import { config } from '../config'

const timeoutDate = () => new Date(Date.now() + Math.floor(config.session.timeout * 60000))

export function getUsername() {
 return Cookies.get('loginEmail') || false
}

export function loginAs(email){
  let timeout =  timeoutDate()

  // Create cookie to expire {config.session.timeoutSec} from now
  Cookies.set('loginEmail', email, {
    expires: timeout
  })
}

export function deauth(){
  console.log('deauth..');
  if ( Cookies.get('loginEmail') ){
    Cookies.remove('loginEmail')
    return true
  }

  return false;
}