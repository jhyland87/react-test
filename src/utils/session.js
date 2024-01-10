import Cookies from 'js-cookie'
import { config } from '../config'

const timeoutDate = () => new Date(Date.now() + Math.floor(config.session.timeout * 60000))

export function getUsername() {
 return Cookies.get('loginEmail') || false
}

export function loginAs(email){
  let timeout =  timeoutDate()

  console.log('timeout:',timeout)

  // Create cookie to expire {config.session.timeoutSec} from now
  Cookies.set('loginEmail', email, {
    expires: timeout
  })

  setTimeout(() => {
    if ( getUsername() )
      window.location = '/timeout'
  },  Math.floor(config.session.timeout * 60000))
}

export function deauth(){
  console.log('deauth..');
  if ( Cookies.get('loginEmail') ){
    Cookies.remove('loginEmail')
  }
}