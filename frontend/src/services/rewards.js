import axios from 'axios'
import baseUrl from '/api/rewards'

const getAll = async () => {
    const req = await axios.get(baseUrl)
    return req.data
}

export default { getAll }