export default (axios) => ({
  follow: (id) => {
    return axios.post('/follow/' + id)
  },
  unfollow: (id) => {
    return axios.post('/unfollow/' + id)
  },
  getFollowingData: (username) => {
    return axios.get('/following-data/' + username)
  }
})
