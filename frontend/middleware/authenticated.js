/* eslint-disable no-unneeded-ternary */
export default function ({ redirect, store }) {
  const isAuthenticated = !!store.state.account.user
  if (!isAuthenticated) {
    redirect('/login')
  }
}
