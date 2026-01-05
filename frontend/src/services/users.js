import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createAccount = async newObject => {
    const res = await axios.post(baseUrl, newObject)
    return res.data
}

const getOne = async (id) => {
    const req = await axios.get(`${baseUrl}/${id}`)
    return req.data
}

const updateImage = async (formData) => {
    const config = {
        headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
        },
    }
    const res = await axios.put(`${baseUrl}/image`, formData, config)
    return res.data
}

export default { setToken, getOne, createAccount, updateImage }