import { useState, useEffect } from 'react'
import userService from '../services/users'
import scoreService from '../services/scores'
import UserStatistics from './UserStatistics'
import LoginFrom from './LoginForm'
import Register from './Register'
import Message from './Message'
import guest from '../assets/guest.png'
import ImageButton from './ImageButton'
import './user.css'

const User = () => {
    const [user, setUser] = useState(null)
    const [scores, setScores] = useState([])
    const [userScores, setUserScores] = useState([])
    const [profilePictureFile, setProfilePictureFile] = useState(null)
    const [isVisible, setIsVisible] = useState(true)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const loggedUserJSON = window.localStorage.getItem('loggedUser')
            if (loggedUserJSON) {
                const loggedUser = JSON.parse(loggedUserJSON)
                userService.setToken(loggedUser.token)

                const fullUser = await userService.getOne(loggedUser.id)
                setUser({
                    ...fullUser,
                    token: loggedUser.token
                })
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            scoreService.getAll().then(data => {
                setScores(data)
            })
    }
    }, [user])

    useEffect(() => {
        if (user && scores.length > 0) {
            setUserScores(scores.filter(score => score.user.username === user.username))
        }
    }, [scores, user])

    const handleLogout = () => {
        setUser(null)
        setScores([])
        setUserScores([])
        setProfilePictureFile(null)
        window.localStorage.removeItem('loggedUser')
    }

    const handleClick = async () => {
        if (!profilePictureFile) return

        const formData = new FormData()
        formData.append('image', profilePictureFile)

        const updated = await userService.updateImage(formData)
        const updatedUser = { ...user, image: updated.image }

        setUser(updatedUser)
        window.localStorage.setItem(
            'loggedUser',
            JSON.stringify(updatedUser)
        )
    }

    const showMessage = (info) => {
        setMessage(info)
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    return (
    <div>
        <Message message={message} />
    <div className="user_box">
        {user ? (
            <>
            <p className='name'>{user.username}</p>
            <button onClick={handleLogout}>Logout</button>
            <ImageButton
                image={user?.image || guest}
                onClick={handleClick}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePictureFile(e.target.files[0])}
            />
            <UserStatistics userScores={userScores}/>
            </>
        ) : (
            <>
            <p className='name'>Guest</p>
            <img className="picture" src={guest} alt="Profile picture" />
            <button onClick={() => setIsVisible(true)}>Login</button>
            <button onClick={() => setIsVisible(false)}>Register</button>
             {isVisible ? <LoginFrom setUser={setUser} showMessage={showMessage}/>
                        : <Register setUser={setUser} showMessage={showMessage}/>}
            </>
        )}
    </div>
    </div>
    )
}

export default User