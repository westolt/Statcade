const RewardButton = ({ reward, user, equip, unequip, onHover }) => {
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
        className="button reward-button"
        onMouseEnter={() => onHover(reward)}
        onMouseLeave={() => onHover(null)}
      >
      <img 
        src={reward.image}
        alt={reward.rewardName}
      />
      <span>{reward.rewardName}</span>
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
            checked={isUsernameEquipped}
            onChange={handleUsernameToggle}
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