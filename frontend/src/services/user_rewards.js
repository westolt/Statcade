import axios from 'axios'
const baseUrl = '/api/user_rewards'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const config = () => ({
  headers: { Authorization: token }
})


const unlock = async (rewardId) => {
    const res = await axios.post(baseUrl, { rewardId }, config())
    return res.data
}

export default { unlock, setToken }