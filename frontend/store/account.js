import { AuthApi, FollowApi } from '@/service'

export const state = () => ({
  account: {},
  follower: [],
  following: [],
  searchUsers: []
})

export const mutations = {
  SET_ACCOUNT(store, data) {
    store.account = data.data
  },
  SET_SEARCH_DATA(store, data) {
    store.searchUsers = data.data
  },
  SET_FOLLOWER(store, data) {
    store.follower = data.data
  },
  SET_FOLLOWING(store, data) {
    store.following = data.data
  },
  ADD_FOLLOWING(state, data) {
    state.following.unshift(data.data)
  },
  REMOVE_FOLLOWING(state, id) {
    state.following = state.following.filter((user) => user.id !== id)
  }
}

export const actions = {
  async register({ commit }, formData) {
    const { data } = await AuthApi(this.$axios).register(formData)
    // commit('SET_ACCOUNT', data)
    return data
  },
  async login({ commit }, formData) {
    const { data } = await AuthApi(this.$axios).login(formData)
    commit('SET_ACCOUNT', data)
  },
  async getme({ commit }) {
    const { data } = await AuthApi(this.$axios).getme()
    commit('SET_ACCOUNT', data)
  },
  async getProfileByUsername({ commit }, username) {
    const { data } = await AuthApi(this.$axios).getProfile(username)
    return data.data
  },
  async updateUser({ commit }, userInfo) {
    const { data } = await AuthApi(this.$axios).updateProfile(userInfo)
    commit('SET_ACCOUNT', data)
  },
  async fetchSearchData({ commit }, q) {
    const { data } = await AuthApi(this.$axios).searchUser(q)
    commit('SET_SEARCH_DATA', data)
  },
  async getFollower({ commit }) {
    const { data } = await AuthApi(this.$axios).getFollowerUsers()
    commit('SET_FOLLOWER', data)
  },
  async getFollowing({ commit }) {
    const { data } = await AuthApi(this.$axios).getFollowingUsers()
    commit('SET_FOLLOWING', data)
  },
  async doFollow({ commit }, id) {
    const { data } = await FollowApi(this.$axios).follow(id)
    commit('ADD_FOLLOWING', data)
    return data
  },
  async doUnfollow({ commit }, id) {
    const { data } = await FollowApi(this.$axios).unfollow(id)
    commit('REMOVE_FOLLOWING', id)
    return data
  }
}
export const getters = {
  currentUser: (state) => {
    return state.account
  },
  searchData: (state) => {
    return state.searchUsers
  },
  followerUser: (state) => {
    return state.follower
  },
  followingUser: (state) => {
    return state.following
  }
}
