export default (axios) => ({
  getTweets: () => {
    return axios.get('/tweets')
  },
  storeTweet: (payload) => {
    return axios.post('/tweets', payload)
  },
  getTweetById: (id) => {
    return axios.get('/tweets/' + id)
  },
  likeTweet: (id) => {
    return axios.post('/tweets/' + id + '/like')
  },
  unlikeTweet: (id) => {
    return axios.delete('/tweets/' + id + '/unlike')
  },
  getUserTweets: (username) => {
    return axios.get(`/user-tweets/${username}`)
  }
})
