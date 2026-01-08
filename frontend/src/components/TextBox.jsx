import './textbox.css'

const TextBox = ({ hoverInfo, user, message }) => {
    const rewardInstructions = hoverInfo?.instructions
    const gameDescription = hoverInfo?.description

    if(message) {
        return(
            <div className='box'>
                <div className='text'>{ message }</div>
            </div>
        )
    }

    if(rewardInstructions) {
        const rewardInfo = hoverInfo.instructions.split(/\r?\n/)
        if(user?.unlockedRewards?.some(r => r.rewardName === hoverInfo.rewardName)) {
            return(
                <div className='box'>
                    <p className='text'><strong>Reward name:</strong></p>
                    <p className='text'>• {hoverInfo.rewardName}</p>
                    <p className='gap'></p>
                    <p className='text'><strong>Use:</strong></p>
                    <p className='text'>• {rewardInfo[0] || '—'}</p>
                </div>
            )
        }
        return (
        <div className="box">
            <p className='text'><strong>Reward name:</strong></p>
            <p className='text'>• {hoverInfo.rewardName}</p>
            <p className='gap'></p>
            <p className='text'><strong>How to unlock:</strong></p>
            <p className='text'>
                {user
                    ? `• ${rewardInfo[1] || '—'}`
                    : `• ${rewardInfo[1] || '—'} You must log in first!`}
            </p>
        </div>
        )
    }

    if(gameDescription) {
        return(
            <div className='box'>
                <p className='text'>{gameDescription}</p>
            </div>
        )
    }

    return(
        <div className='box'>
            {user ? (
                <div className='text'>{ 'Welcome to Statcade!' }</div>
            ) : (
                <div>
                <div className='text'>{ 'Welcome to Statcade!' }</div>
                <div className='text'>{'Log in to save your high scores and unlock rewards!'}</div>
                </div>
            )
            }
        </div>
    )
}

export default TextBox