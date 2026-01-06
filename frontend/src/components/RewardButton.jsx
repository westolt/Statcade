import { useEffect, useState } from "react"

const RewardButton = ({ name, image, onClick, onMouseEnter, onMouseLeave, usernameFont, setUsernameFont, gameFont, setGameFont, unlockedRewards }) => {
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    let unlocked = false
    if (unlockedRewards) {
      unlocked = unlockedRewards.find(r => r.rewardName === name)
    }
    setIsUnlocked(unlocked || false)
  }, [name, unlockedRewards])


  const handleChange = () => {
    return null
  }

  return (
    <div className="selections">
      <button
        className="button reward-button"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
      <img 
        src={image}
        alt={name}
      />
      <span>{name}</span>
      </button>
      <div>
        {isUnlocked ? (
          <>
          <div className="equip">
            <div className="title">Username</div>
            <input
            type="checkbox"
            id="username"
            name="username"
            value="username"
            checked={usernameFont.username}
            onChange={handleChange}
            />
          </div>
          <div className="equip">
            <div className="title">Game</div>
            <input
            type="checkbox"
            id="gamefont"
            name="gamefont"
            value="gamefont"
            checked={gameFont.gamefont}
            onChange={handleChange}
            />
          </div>
          </>
        ) : (
          <>Locked</>
        )}
      </div>
  </div>
  )
}

export default RewardButton