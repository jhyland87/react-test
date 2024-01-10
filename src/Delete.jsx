import { Header } from './Header'
import Account from './models/Account'
import { 
  session
} from './utils'

export const Delete = props => {
  const username = session.getUsername();
  const account = Account.getAccount(username)

  
  if ( ! username ){
   // setDeleteMsg("No active session to reference for delete..")
    console.error("No active session to reference for delete..")
  }
  else if ( ! account || account instanceof Error ){
    //setDeleteMsg(`Error finding account for ${username}`)
    console.error(`Error finding account for ${username}`)
  } else {
    // Delete it..
    account.delete()
    session.deauth()

    
    // Verify it was deleted
    if ( ! Account.getAccount(username)){
      //setDeleteMsg(`Account for ${username} has been deleted`)
      console.log(`Account for ${username} has been deleted`)
    }
    else {
      //setDeleteMsg(`Account for ${username} failed to delete`)
      console.error(`Account for ${username} failed to delete.. that's weird`)
    } 
  }

  return (
    <div id="profile-container">
      <Header 
        //username={session.getUsername()} 
        //logInOutLink={loginLink}
        className="grid gap-5 md:grid-cols-2"/>

     
      <p className="font-semibold text-green-500 mb-5 flex items-center gap-1 center-me">
        Account deleted (if you had one to begin with..)
        {/* I was going to display {deleteMsg} here, but then
            I kept getting plagued with redirect loop errors
            when calling setDeleteMsg(), 
        */}

      </p>

   
    
        
    </div>
  )
}