import { useState } from 'react'
import User from '../components/User'
import GameList from '../components/GameList'
import RewardList from '../components/RewardList'
import TextBox from '../components/TextBox'
import Statistics from '../components/Statistics'
import './home.css'

const Home = ({ games, mode }) => {
    const [ hoverInfo, setHoverId] = useState(null)

    return (
    <div className='container'>
        <div className='userbox'><User /></div>
        <div className='middle-area'>
            <div className='list'>
                {mode === 'GAMES' && (
                <GameList games={games} hoverChange={setHoverId} />
            )}
            </div>
            <div className='rewardlist'>
                {mode === 'REWARDS' && (
                <RewardList hoverChange={setHoverId} />
            )}
            </div>
            <div className='textbox'><TextBox message={hoverInfo ? hoverInfo.description || hoverInfo.instructions : 'Welcome to Statcade!'}/></div>
        </div>
        <div className='stats-position'><Statistics /></div>
    </div>
    )
}

export default Home