import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import './Login.css'
export default function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        login(email,password)
    }
    const {login,isPending,error}=useLogin()
    
    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input type='email'
                required value={email}
                onChange={(e)=>setEmail(e.target.value)}></input>
            </label>
            <label>
                <span>password:</span>
                <input type='password'
                required value={password}
                onChange={(e)=>setPassword(e.target.value)}></input>
            </label>
       
          
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn' disabled >Logging in</button>}
            {error && <div className='error'>{error}</div>} 
        </form>
    )
}
