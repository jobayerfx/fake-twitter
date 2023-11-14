export default function ({ $axios, app }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)

    if (code === 401 && app.$auth.refreshToken.get()) {
      // Token expired, attempt to refresh
      return app.$auth.refreshTokens().then((refreshed) => {
        // Retry the original request after token refresh
        if (refreshed) {
          const config = error.config
          return $axios.request(config)
        }
      })
    }

    return Promise.reject(error)
  })

  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content-Type', 'application/json')
  $axios.setHeader('Access-Control-Allow-Origin', '*')
}
