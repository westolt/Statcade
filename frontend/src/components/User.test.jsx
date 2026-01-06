import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, beforeEach, vi } from 'vitest'
import User from './User'
import App from '../App'

vi.mock('../services/users', () => ({
  default: {
    getOne: vi.fn(() => Promise.resolve({
      id: 1,
      username: 'testuser',
      unlockedRewards: [],
      equippedRewards: [],
    })),
    setToken: vi.fn()
  }
}))

vi.mock('../services/games', () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve([
      { id: 1, name: 'PeriodicPairs' }
    ]))
  }
}))

vi.mock('../services/scores', () => ({
  default: {
    getAll: vi.fn(() => Promise.resolve([
      {
        id: 1,
        score: 10,
        user: { username: 'testuser' },
        game: { name: 'PeriodicPairs' }
      }
    ])),
    setToken: vi.fn()
  }
}))


test('shows login and register when not logged in', () => {
  window.localStorage.clear()

  render(<User />)

  expect(screen.getByText(/login/i)).toBeInTheDocument()
  expect(screen.getByText(/register/i)).toBeInTheDocument()
})

beforeEach(() => {
  window.localStorage.setItem(
    'loggedUser',
    JSON.stringify({ id: 1, username: 'testuser', token: '123' })
  )
})

test('shows username when user is logged in', async () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    unlockedRewards: [],
    equippedRewards: []
  }
  render(<User user={mockUser}/>)

  expect(await screen.findByText('testuser')).toBeInTheDocument()
})

test('shows user scores', async () => {
  const mockUser = {
    id: 1,
    username: 'testuser',
    unlockedRewards: [],
    equippedRewards: []
  }
  render(<User user={mockUser}/>)

  expect(await screen.findByText('PeriodicPairs')).toBeInTheDocument()
  expect(await screen.findByText('10')).toBeInTheDocument()
})

test('logout clears user data', async () => {
  render(<App />)

  const userName = await screen.findByText('testuser', { selector: 'p.name' })
  expect(userName).toBeInTheDocument()

  const user = userEvent.setup()
  await user.click(screen.getByText('Logout'))

  expect(screen.getByText(/login/i)).toBeInTheDocument()
  expect(window.localStorage.getItem('loggedUser')).toBeNull()
})