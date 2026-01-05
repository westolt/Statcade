import { useState } from 'react'
import userService from '../services/users'

const Register = ({ setUser, showMessage }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const handleRegister = async event => {
        event.preventDefault()

        if (!password || password.length < 3) {
            showMessage('Password too short!')
            return
        }

        if (password !== password2) {
            showMessage('Passwords do not match!')
            return
        } else {
            try {
                const newUser= await userService.createAccount({ username, password })

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(newUser)
                )

                userService.setToken(newUser.token)

                const fullUser = await userService.getOne(newUser.id)

                setUser({
                    ...fullUser,
                    token: newUser.token
                })
                showMessage('User created successfully!')
                setUsername('')
                setPassword('')
                setPassword2('')
            } catch (error) {
                console.log('Error during registration: ', error)
                showMessage('Username already taken!')
                return
            }
        }
    }

    return(
        <div>
            <form onSubmit={handleRegister}>
                <div className='register'>
                 <label className="sr-only">Register username</label>
                    <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className='register'>
                 <label className="sr-only">Register password</label>
                    <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <div className='register'>
                <label className="sr-only">Register password again</label>
                    <input
                    type='password'
                    placeholder='Verify password'
                    value={password2}
                    onChange={({ target }) => setPassword2(target.value)}
                    />
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Register