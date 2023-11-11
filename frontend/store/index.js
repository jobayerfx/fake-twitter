import { AuthApi } from '@/service'

export const state = () => ({
  token: '',
  account: null
})

export const mutations = {
  SET_ACCOUNT(store, data) {
    store.account = data
    this.$cookies.set('account', data, { maxAge: 60 * 60 * 24 * 30 })
  },
  SET_TOKEN(store, token) {
    store.token = token
    this.$cookies.set('token', token, { maxAge: 60 * 60 * 24 * 30 })
  },
  LOAD_TOKEN_AND_ACCOUNT(store, { account, token }) {
    store.token = token
    store.account = account
  },
  SIGN_OUT(store) {
    store.token = null
    store.account = null
    this.$cookies.remove('account')
    this.$cookies.remove('token')
  }
}
export const actions = {
  // eslint-disable-next-line require-await
  async nuxtServerInit({ dispatch }) {
    dispatch('loadTokenAndAccount')
  },

  async register({ commit }, formData) {
    // const { data } = await this.$axios.$post('/auth/register', formData)
    const { data } = await AuthApi.register(formData)
    const token = data.token

    commit('SET_ACCOUNT', data)
    commit('SET_TOKEN', token)
  },
  async login({ commit }, formData) {
    const { data } = await AuthApi.login(formData)
    const token = data.token
    commit('SET_ACCOUNT', data)
    commit('SET_TOKEN', token)
  },
  signOut({ commit }) {
    commit('SIGN_OUT')
  },

  async getMe({ commit }) {
    const { data } = await AuthApi.getme()
    commit('SET_ACCOUNT', data)
  },

  // async getProfileByUsername({ commit }, username) {
  //   const { data } = await this.$axios.$get('/users/' + username)
  //   return data
  // },

  async updateUser({ commit }, userInfo) {
    const { data } = await AuthApi.updateProfile(userInfo)
    commit('SET_ACCOUNT', data)
  },

  async loadTokenAndAccount({ commit }) {
    const token = this.$cookies.get('token')
    const account = this.$cookies.get('account')
    const data = {
      account,
      token
    }
    commit('LOAD_TOKEN_AND_ACCOUNT', data)
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
