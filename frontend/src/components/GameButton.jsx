import './gamebutton.css'
import './fonts.css'

const GameButton = ({ game, user, onClick, onMouseEnter, onMouseLeave }) => {
  const reward = user?.equippedRewards?.find(
    r => r.gameId === game.id && r.slot === 'GAME_FONT'
  )

  const thumbnailFont = reward?.rewardId
  return (
    <button
      className="game-button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {game.id !== 1 ? (
        <div>
          <img 
            src={game.thumbnail}
            alt={game.name}
          />
          <span>{game.name}</span>
        </div>
      ) : (
        <div className={`game-thumbnail ${thumbnailFont && `font-${thumbnailFont}`}`}>
          {game.name}
        </div>
      )}
    </button>
  )
}

export default GameButton