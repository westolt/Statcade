import './fonts.css'
import guest from '../assets/guest.png'

const Scoreboard = ({ scoreboard}) => {
    return(
        <div>
            <div className='scoreboard'>
                <h2 className="top10">Top 10 Highscores:</h2>
                <div className='top_list'>
                    {scoreboard.map((highscore, index) => { 
                    const usernameFont = highscore.user.equippedRewards?.find(r => r.slot === 'USERNAME_FONT')
                    const userPic = highscore.user.image || guest
                    return(
                    <div className='player_info' key={highscore.id}>
                        <div className='player_cell'>
                            <div className={`rank ${index === 0 && 'first'} ${index === 1 && 'second'} ${index === 2 && 'third'}`}>{index + 1}</div>
                        </div>
                        <div className='player_cell'>
                             <img className={`profile_pic ${index === 0 && 'first'} ${index === 1 && 'second'} ${index === 2 && 'third'}`} src={userPic} alt='Profile picture' />
                        </div>
                        <div className='player_cell'>
                            <div className={`${usernameFont ? `font-${usernameFont.rewardId}` : ''}`}>
                                {highscore.user.username}
                            </div>
                        </div>
                        <div className='player_cell'>{highscore.score}</div>
                    </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Scoreboard