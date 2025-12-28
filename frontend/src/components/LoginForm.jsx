import { useState } from 'react'
import loginService from '../services/login'
import userService from '../services/users'
import Message from './Message'

const LoginFrom = ({ setUser }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)

    const handleLogin = async event => {
            event.preventDefault()
            
            try {
                const user = await loginService.login({ username, password })

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )

                userService.setToken(user.token)
                console.log('TOKEN: ', user.token)
                setUser(user)
                setUsername('')
                setPassword('')
            } catch {
                setMessage('Wrong credentials')
                setTimeout(() => {
                    setMessage(null)
                }, 3000)
            }
        }

    return(
        <div>
            <Message message={message}/>
            <form className='loginbox' onSubmit={handleLogin}>
                <div className='login'>
                <label className="sr-only">Username</label>
                    <input
                    type="text"
                    placeholder='Username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                <label className="sr-only">Password</label>
                    <input
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default LoginFrom