import { AuthApi } from '@/service'

export const state = () => ({
  account: {}
})

export const mutations = {
  SET_ACCOUNT(store, data) {
    store.account = data.data
  }
}
export const getters = {
  currentUser: (state) => {
    return state.account
  }
}
export const actions = {
  // async register({ commit }, formData) {
  //   const { data } = await AuthApi(this.$axios).register(formData)
  //   commit('SET_ACCOUNT', data)
  // },
  // async login({ commit }, formData) {
  //   const { data } = await AuthApi(this.$axios).login(formData)
  //   commit('SET_ACCOUNT', data)
  // },
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
  }

  // async uploadImages({}, images) {
  //   const allURLs = []

  //   for (const image of images) {
  //     const fd = new FormData()
  //     fd.append('image', image)
  //     const imageInfo = await this.$axios.$post('/upload', fd)
  //     allURLs.push(imageInfo.url)
  //   }

  //   return allURLs
  // }
}
