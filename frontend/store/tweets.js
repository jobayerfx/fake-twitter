import { TweetApi } from '@/service'
export const state = () => ({
  tweets: [],
  tweetDetails: {},
  userTweets: []
})
export const mutations = {
  FETCH_TWEETS(state, data) {
    state.tweets = data.data
  },
  FETCH_USER_TWEETS(state, data) {
    state.userTweets = data.data
  },
  FETCH_STORE_TWEET_DETAILS_BY_ID(state, tweetDetails) {
    state.tweetDetails = tweetDetails.data
  },
  SWITCH_LIKE(state, { id, action }) {
    const tweet = state.tweets.filter((tweet) => tweet.id === id)[0]
    tweet.likesQuantity++
  },
  ADD_TWEET(state, tweet) {
    state.tweets.unshift(tweet)
  },

  UPDATE_TWEET(state, tweet) {
    const id = tweet.id
    const tweetIndex = state.tweets.findIndex((item) => item.id === id)
    if (tweetIndex !== -1) {
      state.tweets[tweetIndex] = tweet
    }
  },
  DELETE_TWEET(state, id) {
    state.tweets = state.tweets.filter((tweet) => tweet.id !== id)
  }
}
export const actions = {
  async fetchTweets({ commit }) {
    const { data } = await TweetApi(this.$axios).getTweets()
    commit('FETCH_TWEETS', data)
  },
  async fetchStoreTweetDetailsById({ commit }, id) {
    const { data } = await TweetApi(this.$axios).getTweetById(id)
    commit('FETCH_STORE_TWEET_DETAILS_BY_ID', data)
  },
  async fetchTweetsByUsername({ commit }, username) {
    const { data } = await TweetApi(this.$axios).getUserTweets(username)
    commit('FETCH_USER_TWEETS', data)
  },

  async switchLike({ commit }, { id, action }) {
    if (action === 'add') {
      await TweetApi(this.$axios).likeTweet(id)
    } else {
      await TweetApi(this.$axios).unlikeTweet(id)
    }
    // await commit('SWITCH_LIKE', {id, action});
  },

  async addTweet({ dispatch, commit, rootState }, tweetData) {
    const { data } = await TweetApi(this.$axios).storeTweet(tweetData)
    commit('ADD_TWEET', data.data)
  },
  async updateTweet({ commit }, { content, id }) {
    const { data } = await this.$axios.$put('tweets/' + id, { content })
    commit('UPDATE_TWEET', data)
  },
  async deleteTweet({ commit }, id) {
    await this.$axios.$delete('tweets/' + id)
    commit('DELETE_TWEET', id)
  }
}
export const getters = {
  tweetsData: (state) => {
    return state.tweets
  },
  tweetDetailsData: (state) => {
    return state.tweetDetails
  },
  userTweets: (state) => {
    return state.userTweets
  }
}
