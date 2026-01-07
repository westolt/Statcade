import { useState, useEffect } from 'react'
import rewardService from '../services/rewards'
import userService from '../services/users'
import RewardButton from './RewardButton'
import './rewardlist.css'

const RewardList = ({ user, setUser, hoverChange, equip, unequip }) => {
    const [rewards, setRewards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        rewardService.getAll().then(data => {
            setRewards(data)
            setLoading(false)
        })

    }, [])

    useEffect(() => {
        const updateRewards = async () => {
            try {
                const fullUser = await userService.getOne(user.id)
                setUser({
                    ...fullUser,
                    unlockedRewards: fullUser.unlockedRewards
                })
            } catch (err) {
                console.error('Error fetching rewards:', err)
            } 
        }

        updateRewards()
    }, [])

    if (loading) return <div className='loading'>Loading rewards...</div>

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
                    />
                )}
            </div>
        </div>
    )
}

export default RewardList