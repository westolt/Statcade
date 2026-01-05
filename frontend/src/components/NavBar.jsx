import { useNavigate } from 'react-router-dom'

const NavBar = ({ onChange }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/`)
    }


    return(
        <div className="navbar">
            <div className="nav-game">
                <button className="button navbar-button" onClick={() => handleClick(onChange('GAMES'))}>Games</button>
            </div>
            <div className="nav-reward">
                <button className="button navbar-button" onClick={() => handleClick(onChange('REWARDS'))}>Rewards</button>
            </div>
        </div>
    )
}

export default NavBar