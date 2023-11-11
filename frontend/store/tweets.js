import { TweetApi } from '@/service'
export const state = () => ({
  tweets: [],
  tweetDetails: {}
})
export const mutations = {
  FETCH_TWEETS(state, data) {
    state.tweets = data
  },
  FETCH_STORE_TWEET_DETAILS_BY_ID(state, tweetDetails) {
    state.tweetDetails = tweetDetails
  },
  SWITCH_LIKE(state, { id, action }) {
    const tweet = state.tweets.filter((tweet) => tweet._id === id)[0]
    tweet.likesQuantity++
  },
  ADD_TWEET(state, tweet) {
    state.tweets.unshift(tweet)
  },

  UPDATE_TWEET(state, tweet) {
    const id = tweet._id
    const tweetIndex = state.tweets.findIndex((item) => item._id === id)
    if (tweetIndex !== -1) {
      state.tweets[tweetIndex] = tweet
    }
  },
  DELETE_TWEET(state, id) {
    state.tweets = state.tweets.filter((tweet) => tweet._id !== id)
  }
}
export const actions = {
  async fetchTweets({ commit }) {
    const { data } = await TweetApi.getTweets()
    commit('FETCH_TWEETS', data)
  },
  async fetchStoreTweetDetailsById({ commit }, id) {
    const { data } = await TweetApi.getTweetById(id)
    commit('FETCH_STORE_TWEET_DETAILS_BY_ID', data)
  },

  async switchLike({ commit }, { id, action }) {
    if (action === 'add') {
      console.log('add')
    } else {
      console.log('remove')
    }
    // await commit('SWITCH_LIKE', {id, action});
  },

  async addTweet({ dispatch, commit, rootState }, tweetData) {
    const allURLs = await dispatch('uploadImages', tweetData.images, {
      root: true
    })
    const fd = {
      text: tweetData.text,
      user: rootState.account._id,
      imagesURLs: allURLs
    }

    const { data } = await TweetApi.storeTweet(fd)
    commit('ADD_TWEET', data)
  },
  async updateTweet({ commit }, { text, id }) {
    // const { data } = await this.$axios.$patch('tweets/' + id, { text })
    // commit('UPDATE_TWEET', data)
  },
  async deleteTweet({ commit }, id) {
    // await this.$axios.$delete('tweets/' + id)
    // commit('DELETE_TWEET', id)
  }
}