import { useState, useEffect } from 'react'
import rewardService from '../services/rewards'
import RewardButton from './RewardButton'
import './rewardlist.css'

const RewardList = ({ user, hoverChange, equip, unequip }) => {
    const [rewards, setRewards] = useState([])
    const [loading, setLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(null)

    useEffect(() => {
        rewardService.getAll().then(data => {
            setRewards(data)
            setLoading(false)
        })

    }, [])

    if (loading) return <div className='loading'>Loading rewards...</div>

    const handleClick = (id) => {
        setIsVisible(prev =>
            prev === id ? null : id
        )
    }

    return (
        <div>
            <div className='game-rewards'>
                {rewards.map(reward => 
                    <RewardButton
                        key={reward.id}
                        reward={reward}
                        user={user}
                        equip={equip}
                        unequip={unequip}
                        onHover={hoverChange}
                        onClick={() => handleClick(reward.id)}
                        isVisible={isVisible === reward.id}
                    />
                )}
            </div>
        </div>
    )
}

export default RewardList