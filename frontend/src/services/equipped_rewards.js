import axios from 'axios'
import baseUrl from '/api/equipped_rewards'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = () => ({
  headers: { Authorization: token }
})

const equip = async reward => {
    const res = await axios.post(baseUrl, reward, config())
    return res.data
}

const unequipt = async ({ slot, gameId }) => {
    const res = await axios.delete(baseUrl, {
        ...config(),
        data: { slot, gameId }
    })
    return res.data
}


export default { equip, unequipt, setToken }