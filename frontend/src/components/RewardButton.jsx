const RewardButton = ({ name, image, onClick, onMouseEnter, onMouseLeave }) => {

  return (
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
  )
}

export default RewardButton