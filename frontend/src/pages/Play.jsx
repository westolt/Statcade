import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './play.css'
import GameScreen from '../components/GameScreen'
import Textbox from '../components/TextBox'
import Scoreboard from '../components/Scoreboard'
import scoreService from '../services/scores'

const Play = ({ games }) => {
    const id = useParams().id
    const game = games.find(g => g.id === Number(id))
    const [scoreboard, setScoreboard] = useState([])
    const [loadingScores, setLoadingScores] = useState(true)

    useEffect(() => {
        if (game) {
            scoreService.getGame(game.id).then(data => {
                setScoreboard(data)
                setLoadingScores(false)
            })
    }
    }, [game])

    if (!game) {
        return <div>Loading game...</div>
    }

    return (
        <div className='playbox'>
            <div className='game-layout'>
                <div className='emptyspace-position'></div>
                <div className='gamescreen-position'>
                    <GameScreen game={game}/>
                </div>
                <div className='scoreboard-position'><Scoreboard scoreboard={scoreboard} loading={loadingScores} /></div>
            </div>
            <div className='textbox'><Textbox message={game.howToPlay}/></div>
        </div>
    )
}

export default Play