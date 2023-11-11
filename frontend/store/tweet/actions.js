import { TweetApi } from '@/service'

export default {
  async getUserTweets({ commit }) {
    const { data } = await TweetApi(this.$axios).getTweets()
    commit('SET_USER_TWEETS', data.data)
  }
}
