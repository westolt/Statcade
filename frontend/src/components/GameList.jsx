import { useNavigate } from 'react-router-dom'
import GameButton from './GameButton'
import './gamelist.css'

const GameList = ({ games, hoverChange, user }) => {
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/games/${id}`)
    }

    return (
        <div>
            <div className="game-list">

            {games.map(game => 
                <GameButton
                    key={game.id}
                    game={game}
                    user={user}
                    onClick={() => handleClick(game.id)}
                    onMouseEnter={()=>hoverChange(game)}
                    onMouseLeave={()=>hoverChange(null)}
                        />
            )}
            </div>
        </div>
    )
}

export default GameList