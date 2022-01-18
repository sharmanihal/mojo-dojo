import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
export default function Navbar() {
    const {logout,isPending}=useLogout()
    const {user}=useAuthContext()
    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='dojo logo'></img>
                    <span>The Dojo</span>
                </li>
                <li>
                {!user&&<Link to='/login'>Login</Link>}
                </li>
                <li>
                   {!user&& <Link to='/signup'>Signup</Link>}
                </li>
                <li>
                   { !isPending && user && <button className='btn' onClick={logout}>Logout</button>}
                   {isPending && user && <button className='btn' disabled >Logging Out...</button>}
                </li>
            </ul>
        </div>
    )
}
