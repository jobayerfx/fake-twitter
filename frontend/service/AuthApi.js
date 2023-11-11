export default (axios) => ({
  login: (payload) => {
    return axios.post('/auth/login', payload)
  },
  register: (payload) => {
    return axios.post('/auth/register', payload)
  },
  getme: () => {
    return axios.get('/auth/me')
  },
  logout: () => {
    return axios.post('/logout')
  },
  updateProfile: (payload) => {
    return axios.put('/profile/update', payload)
  },
  getFollowingUsers: () => {
    return axios.get('/me/following')
  },
  getFollowerUsers: () => {
    return axios.get('/me/followers')
  }
})
