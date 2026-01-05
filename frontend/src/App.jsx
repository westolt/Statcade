import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import gameService from './services/games'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Play from './pages/Play'
import './app.css'

const App = () => {
  const [games, setGames] = useState([])
  const [homeMode, setHomeMode] = useState('GAMES')

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
            <Route path='/' element={<Home games={games} mode={homeMode} />} />
            <Route path='/games/:id' element={<Play games={games} />} />
          </Routes>
      </Router>
  )
}

export default App