import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import userService from './services/users'
import userRewardsService from './services/user_rewards'
import equippedRewardsService from './services/equipped_rewards'
import gameService from './services/games'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Play from './pages/Play'
import './app.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [games, setGames] = useState([])
  const [homeMode, setHomeMode] = useState('GAMES')

  useEffect(() => {
    const fetchUser = async () => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            userService.setToken(loggedUser.token)
            equippedRewardsService.setToken(loggedUser.token)

            const fullUser = await userService.getOne(loggedUser.id)
            setUser({
                ...fullUser,
                token: loggedUser.token
            })
        }
    }
    fetchUser()
  }, [])

  const handleUnlock = async (rewardId) => {
    const newReward = await userRewardsService.unlock(rewardId)

    const updatedUnlockedRewards = [
      ...user.unlockedRewards,
      newReward
    ]

    setUser({
      ...user,
      unlockedRewards: updatedUnlockedRewards
    })
  }

  const handleEquip = async ({ rewardId, slot, gameId }) => {
    const newEquip = await equippedRewardsService.equip({ rewardId, slot, gameId })
    let updatedEquippedRewards = [...user.equippedRewards]

    updatedEquippedRewards = updatedEquippedRewards.filter(r => !(r.slot === slot && r.gameId === gameId))

    updatedEquippedRewards.push(newEquip)

    setUser({
      ...user,
      equippedRewards: updatedEquippedRewards
    })
  }

  const handleUnequip = async ({ slot, gameId }) => {
    await equippedRewardsService.unequip({ slot, gameId })
    let updatedEquippedRewards = [...user.equippedRewards]

    updatedEquippedRewards = updatedEquippedRewards.filter(r => !(r.slot === slot && r.gameId === gameId))

    setUser({
      ...user,
      equippedRewards: updatedEquippedRewards
    })
  }

  useEffect(() => {
    gameService
      .getAll()
      .then(initalGames => {
        setGames(initalGames)
      })
  }, [])

  return (
      <Router>
        <Header />
          <NavBar onChange={setHomeMode} />
          <Routes>
            <Route path='/' element={<Home user={user} setUser={setUser} equip={handleEquip} unequip={handleUnequip} games={games} mode={homeMode} />} />
            <Route path='/games/:id' element={<Play games={games} unlock={handleUnlock} />} />
          </Routes>
      </Router>
  )
}

export default App