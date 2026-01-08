import './reward-button.css'

const RewardButton = ({ reward, user, equip, unequip, onHover, onClick, isVisible }) => {
  const isUnlocked = user?.unlockedRewards?.some(r => r.rewardName === reward.rewardName)

  const isUsernameEquipped = user?.equippedRewards?.some(r => r.rewardId === reward.id && r.slot === 'USERNAME_FONT')

  const handleUsernameToggle = () => {
    if (isUsernameEquipped) {
      unequip({ slot: 'USERNAME_FONT', gameId: null })
    } else {
      equip({ rewardId: reward.id, slot: 'USERNAME_FONT', gameId: null })
    }
  }

  return (
    <div className="selections">
      <button
        className={`reward-button
          ${isUnlocked ? '' : 'locked'}
          ${isUsernameEquipped ? 'equipped' : ''}
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
        {isUnlocked ? (
          <div className="equip">
            <div className="title">Username</div>
            <input
              type="checkbox"
              checked={isUsernameEquipped}
              onChange={handleUsernameToggle}
            />
          </div>
        ) : (
            <></>
        )}
      </div>
  </div>
  )
}

export default RewardButton