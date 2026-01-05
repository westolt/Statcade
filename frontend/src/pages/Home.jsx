import { useState } from 'react'
import User from '../components/User'
import GameList from '../components/GameList'
import TextBox from '../components/TextBox'
import Statistics from '../components/Statistics'
import './home.css'

const Home = ({ games, mode }) => {
    const [ hoverId, setHoverId] = useState(null)
    const hoveredGame = games.find(g => g.id === hoverId)

    return (
    <div className='container'>
        <div className='userbox'><User /></div>
        <div className='middle-area'>
            <div className='list'>
                {mode === 'GAMES' && (
                <GameList games={games} hoverChange={setHoverId}/>
            )}
            </div>
            <div className='rewardlist'>
                {mode === 'REWARDS' && (
                <RewardList hoverChange={setHoverId}/>
            )}
            </div>
            <div className='textbox'><TextBox message={hoveredGame ? hoveredGame.description : 'Welcome to Statcade!'}/></div>
        </div>
        <div className='stats-position'><Statistics /></div>
    </div>
    )
}

export default Home