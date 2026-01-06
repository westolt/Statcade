import { useState, useEffect } from 'react'
import rewardService from '../services/rewards'
import RewardButton from './RewardButton'
import './rewardlist.css'

const RewardList = ({ user, hoverChange }) => {
    const [rewards, setRewards] = useState([])
    const [loading, setLoading] = useState(true)
    const [usernameFont, setUsernameFont] = useState(false)
    const [gameFont, setGameFont] = useState(false)

    useEffect(() => {
        rewardService.getAll().then(data => {
            setRewards(data)
            setLoading(false)
        })

    }, [])

    const getUnlockedRewards = (user, rewards) => {
        if (!user || !user.unlockedRewards) return []
        const unlocked = user.unlockedRewards.map(r => r.rewardName)
        return rewards.filter(reward => unlocked.includes(reward.rewardName))
    }

    const unlockedRewards = user ? getUnlockedRewards(user, rewards) : null

    const handleClick = () => {
        return console.log('Unlocked Rewards: ', unlockedRewards)
    }

    if (loading) return <div className='loading'>Loading rewards...</div>

    return (
        <div>
            <div className='game-rewards'>
                {rewards.map(reward => 
                    <RewardButton
                        key={reward.id}
                        name={reward.rewardName}
                        image={reward.thumbnail}
                        onClick={() => handleClick(reward.id)}
                        onMouseEnter={()=>hoverChange(reward)}
                        onMouseLeave={()=>hoverChange(null)}
                        usernameFont={usernameFont}
                        setUsernameFont={setUsernameFont}
                        setGameFont={setGameFont}
                        gameFont={gameFont}
                        unlockedRewards={unlockedRewards}
                            />
                )}
            </div>
        </div>
    )
}

export default RewardList