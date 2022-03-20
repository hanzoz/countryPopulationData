import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'sessionData',
    paths: ['favouriteCountries', 'charts'],
  })(store)
}
