import { useState, useEffect, useRef } from 'react'
import userService from '../services/users'
import scoreService from '../services/scores'
import UserStatistics from './UserStatistics'
import LoginFrom from './LoginForm'
import Register from './Register'
import Message from './Message'
import guest from '../assets/guest.png'
import ImageButton from './ImageButton'
import './user.css'
import './fonts.css'
import equippedRewardsService from '../services/equipped_rewards'

const User = ({ user, setUser}) => {
    const [scores, setScores] = useState([])
    const [userScores, setUserScores] = useState([])
    const fileInputRef = useRef(null)
    const [isVisible, setIsVisible] = useState(true)
    const [message, setMessage] = useState(null)
    const getEquippedReward = (user, slot) => {
        if (!user || !user.equippedRewards) return null
        return user.equippedRewards.find(r => r.slot === slot) || null
    }
    const usernameFont = user ? getEquippedReward(user, 'USERNAME_FONT') : null

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
        userService.setToken(null)
        equippedRewardsService.setToken(null)
        window.localStorage.removeItem('loggedUser')
    }

    const handleImageButtonClick = () => {
        fileInputRef.current.click()
    }

    const handleFileSelected = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('image', file)

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
            <div className='top_row'>
                <div className={`name ${usernameFont ? `font-${usernameFont.rewardId}` : ''}`}>{user.username}</div>
                <button className='logout_position' onClick={handleLogout}>Logout</button>
            </div>
            <ImageButton
                image={user?.image || guest}
                onClick={handleImageButtonClick}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileSelected}
                ref={fileInputRef}
                hidden
            />
            <UserStatistics userScores={userScores} scores={scores} />
            </>
        ) : (
            <>
            <div className='name'>Guest</div>
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