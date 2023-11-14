export default (axios) => ({
  login: (payload) => {
    return axios.post('/auth/login', payload)
  },
  register: (payload) => {
    return axios.post('/auth/register', payload)
  },
  getme: () => {
    return axios.get('/me')
  },
  logout: () => {
    return axios.post('/auth/logout')
  },
  updateProfile: (payload) => {
    return axios.post('/profile/update', payload)
  },
  getFollowingUsers: () => {
    return axios.get('/me/following')
  },
  getFollowerUsers: () => {
    return axios.get('/me/followers')
  },
  getProfile: (username) => {
    return axios.get('/profile/' + username)
  },
  searchUser: (payload) => {
    return axios.post('/search', payload)
  }
})
