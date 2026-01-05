import { useState } from 'react'
import loginService from '../services/login'
import userService from '../services/users'

const LoginFrom = ({ setUser, showMessage }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const handleLogin = async event => {
            event.preventDefault()
            
            try {
                const user = await loginService.login({ username, password })

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )

                userService.setToken(user.token)

                const fullUser = await userService.getOne(user.id)

                setUser({
                    ...fullUser,
                    token: user.token
                })
                setUsername('')
                setPassword('')
            } catch {
                showMessage ('Wrong credentials')
                return
            }
        }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <div className='login'>
                <label className="sr-only">Username</label>
                    <input
                    type='text'
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
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}


export default LoginFrom