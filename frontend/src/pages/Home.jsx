import { useState } from 'react'
import User from '../components/User'
import GameList from '../components/GameList'
import RewardList from '../components/RewardList'
import TextBox from '../components/TextBox'
import Statistics from '../components/Statistics'
import './home.css'

const Home = ({ user, setUser, equip, unequip, games, mode }) => {
    const [ hoverInfo, setHoverId] = useState(null)

    return (
    <div className='container'>
        <div className='middle-area'>
            <div className='userbox'><User user={user} setUser={setUser}/></div>
            <div className='lists'>
                <div>
                    {mode === 'GAMES' && (
                        <GameList games={games} hoverChange={setHoverId} />
                    )}
                </div>
                <div>
                    {mode === 'REWARDS' && (
                        <RewardList user={user} hoverChange={setHoverId} equip={equip} unequip={unequip} />
                    )}
                </div>
            </div>
            <div className='stats-position'><Statistics /></div>
        </div>
        <div className='textbox'><TextBox hoverInfo={hoverInfo} user={user} /></div>
    </div>
    )
}

export default Home