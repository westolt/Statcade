const GameScreen = ({ game }) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const loggedUser = loggedUserJSON
        ? JSON.parse(loggedUserJSON)
        : null

    const gameUrl = new URL(game.url)

    gameUrl.searchParams.set('id', game.id)

    if (loggedUser?.username) {
        gameUrl.searchParams.set('username', loggedUser.username)
    }

    return(
        <iframe
        src={gameUrl.toString()}
        title={game.name}
        style={{ border: 0}}
        />
    )
}

export default GameScreen