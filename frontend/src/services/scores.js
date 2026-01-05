import axios from 'axios'
const baseUrl = '/api/scores'

const getAll = async () => {
    const req = await axios.get(baseUrl)
    return req.data
}

const getGame = async (id) => {
    const req = await axios.get(`${baseUrl}/game/${id}`)
    return req.data
}

export default { getAll, getGame }