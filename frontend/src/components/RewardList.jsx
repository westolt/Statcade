import { useState, useEffect } from 'react'
import rewardService from '../services/rewards'
import RewardButton from './RewardButton'

const RewardList = ({ hoverChange }) => {
    const [rewards, setRewards] = useState([])

    useEffect(() => {
        rewardService.getAll().then(data => {
            setRewards(data)
        })
    }, [])

    const handleClick = () => {
        return console.log('Clicked!')
    }

    return (
        <div>
            <div>

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