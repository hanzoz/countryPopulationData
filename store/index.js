export const state = () => ({
  loading: false,
  countries: [],
  searchData: [],
  favouriteCountries: [],
  charts: {
    country: [],
    population: [],
  },
})

export const getters = {
  loading: (state) => state.loading,
  countries: (state) => state.countries,
  searchData: (state) => state.searchData,
  favouriteCountries: (state) => state.favouriteCountries,
  country: (state) => state.charts.country,
  population: (state) => state.charts.population,
}

export const mutations = {
  SET_LOADING(state, payload) {
    state.loading = payload
  },
  SET_COUNTRIES(state, payload) {
    state.countries = payload
  },
  SET_FAVOURITE(state, payload) {
    state.favouriteCountries = payload
  },
  SET_CHART_DATA(state, payload) {
    const countryData = []
    const populationData = []

    _.map(payload, (item) => {
      countryData.push(item.country)
      populationData.push(item.population)
    })

    state.charts.country = countryData
    state.charts.population = populationData
  },
  SET_SEARCH_DATA(state, payload) {
    state.searchData = payload
  },
  REMOVE_COUNTRY(state, payload) {
    state.favouriteCountries.splice(payload, 1)
  },
}

export const actions = {
  async getAllCountries({ commit }) {
    commit('SET_LOADING', true)

    // get country list data from restcountries api
    let result = await this.$axios.$get('https://restcountries.com/v3.1/all')
    result = result
      .map((item) => {
        return {
          country: item.name.common.toLowerCase(),
          region: item.region,
          capital: String(item.capital).toLowerCase(),
          flag: item.flag,
          population: item.population,
        }
      })
      .sort(function (a, b) {
        // sort the data by ascending order using country name
        if (a.country < b.country) {
          return -1
        }
        if (a.country > b.country) {
          return 1
        }
        return 0
      })

    commit('SET_LOADING', false)

    // set country data
    commit('SET_COUNTRIES', result)
  },
  searchCountry({ state, commit }, payload) {
    if (payload) {
      const list = _.cloneDeep(state.countries)

      // filter country by keyword
      const result = _.filter(list, (item) => {
        const country = item.country.toLowerCase()
        const capital = String(item.capital).toLowerCase()
        const keyword = payload.toLowerCase()

        if (country.includes(keyword) || capital.includes(keyword)) {
          return item
        }
      })

      // set filtered search data
      commit('SET_SEARCH_DATA', result)
    }
  },
  setFavourite({ commit }, payload) {
    // set favourite data
    commit('SET_FAVOURITE', payload)
    // set chart data
    commit('SET_CHART_DATA', payload)
  },
}
