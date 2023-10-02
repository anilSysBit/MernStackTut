import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  // const navigate = useNavigate()

  const handleClick =()=>{
    logout()
    // navigate("/login")
  }
  return (
    <div className='navbar'>
        <Link to="/">
            <h2>Workout Buddy</h2>
        </Link>
        <nav>
          <div>
            {user && (<div>
              <span>{user.email}</span>
            <span onClick={handleClick}>Logout</span>
            </div>
            )}
          {!user && (
            <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
          )}
          </div>
        </nav>
    </div>
  )
}

export default Navbar