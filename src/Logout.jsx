
import { Header } from './Header'
import { session } from './utils'

export const Logout = props => {
  session.deauth() 

  return (
    <div>
      <Header className="grid gap-5 md:grid-cols-2"/>
      <div className=" center-me">Logged out</div>
    </div>
  )
}