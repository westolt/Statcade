const GameScreen = ({ game }) => {
    return(
        <iframe
        src={`${game.url}?id=${game.id}`}
        title={game.name}
        style={{ border: 0}}
        />
    )
}

export default GameScreen