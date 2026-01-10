const UserStatistics = ({ userScores, scores }) => {

    const getRank = (gameId, userScore) => {
        const gameScores = scores
            .filter(s => s.gameId === gameId)
            .map(s => s.score)
            .sort((a, b) => b - a)

        let rank = gameScores.findIndex(score => score <= userScore) + 1
        return rank
    }

    return(
        <div className='user_stats_table'>
            {userScores.length > 0 ? (
            <div>
                {userScores.map(score => {
                    const rank = getRank(score.gameId, score.score)
                    return(
                        <div className='game_stats' key={score.id}>
                        <div className='game_name'>
                            {score.game.name}
                        </div>
                        <div className='user_score_row'>
                            <div className='score_label'>Score</div>
                            <div className='user_score'>{score.score}</div>
                        </div>
                        <div className='other_stats'>
                            Rank: {rank} out of {scores.filter(s => s.gameId === score.gameId).length} players<br/>
                        </div>
                    </div>
                    )
                }
                )}
            </div>
        ) : (
            <div className="no_stats">Play games to save your scores!</div>
        )
        }
        </div>
    )
}

export default UserStatistics