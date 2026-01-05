import { useState, useEffect } from 'react'
import rewardService from '../services/rewards'
import RewardButton from './RewardButton'
import './rewardlist.css'

const RewardList = ({ hoverChange }) => {
    const [rewards, setRewards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        rewardService.getAll().then(data => {
            setRewards(data)
            setLoading(false)
        })
    }, [])

    const handleClick = () => {
        return console.log('Clicked!')
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
                            />
                )}
            </div>
        </div>
    )
}

export default RewardList