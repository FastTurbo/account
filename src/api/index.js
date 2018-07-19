import axios from 'axios'

const api = process.env.REACT_APP_ORIGIN_URL || 'http://5b45cd9d872d12001429741a.mockapi.io'

export const getAll = () => axios.get(`${api}/api/records`)
export const create = data => axios.post(`${api}/api/records`,data)
export const edit = (id,data) => axios.put(`${api}/api/records/${id}`,data)
export const deleteOne = id => axios.delete(`${api}/api/records/${id}`)