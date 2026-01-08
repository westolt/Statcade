import './reward-button.css'

const RewardButton = ({ reward, user, equip, unequip, onHover, onClick, isVisible }) => {
  const isUnlocked = user?.unlockedRewards?.some(r => r.rewardName === reward.rewardName)

  const isUsernameEquipped = user?.equippedRewards?.some(r => r.rewardId === reward.id && r.slot === 'USERNAME_FONT')

  const isGameFontEquipped = user?.equippedRewards?.some(r => r.rewardId === reward.id && r.slot === 'GAME_FONT')

  const handleUsernameToggle = () => {
    if (isUsernameEquipped) {
      unequip({ slot: 'USERNAME_FONT', gameId: null })
    } else {
      equip({ rewardId: reward.id, slot: 'USERNAME_FONT', gameId: null })
    }
  }

  const handleGameFontToggle = () => {
    if (isGameFontEquipped) {
      unequip({ slot: 'GAME_FONT', gameId: reward.gameId })
    } else {
      equip({ rewardId: reward.id, slot: 'GAME_FONT', gameId: reward.gameId })
    }
  }

  return (
    <div className="selections">
      <button
        className={`reward-button
          ${isUnlocked ? '' : 'locked'}
          ${isUsernameEquipped ? 'equipped' : ''}
          ${isGameFontEquipped ? 'equipped' : ''}
          ${reward.gameId === 1 ? `background-${reward.id}` : ''}
        `}
        onClick={onClick}
        onMouseEnter={() => onHover(reward)}
        onMouseLeave={() => onHover(null)}
      >
      {!isUnlocked && <div className='locked-text'>LOCKED</div>}
      {reward.gameId !== 1 && (
        <>
          <img src={reward.image} alt={reward.rewardName} />
          <span>{reward.rewardName}</span>
        </>
      )}
      </button>
      <div className={`drop-down ${isVisible ? 'show' : ''}`}>
      {isUnlocked && (
        <>
          <div className="equip-row">
            <div className="title">Username</div>
            <div className='equip'>
              <input
              type="checkbox"
              checked={isUsernameEquipped}
              onChange={handleUsernameToggle}
            />
            </div>
          </div>
          <div className="equip-row">
            <div className="title">Game Font</div>
            <div className='equip'>
              <input
              type="checkbox"
              checked={isGameFontEquipped}
              onChange={handleGameFontToggle}
            />
            </div>
          </div>
        </>
      )}
    </div>
  </div>
  )
}

export default RewardButton