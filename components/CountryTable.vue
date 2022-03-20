<template>
  <v-card class="pa-5 rounded-lg">
    <div class="mb-5 title">List of countries</div>

    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      @keyup="searchKeyword"
    />

    <v-data-table
      v-model="selectedCountries"
      :headers="headers"
      :items="tableData"
      :single-select="false"
      item-key="country"
      show-select
      :loading="loading"
      loading-text="Loading data..."
      class="elevation-1"
    >
      <template #[`item.country`]="{ item }">
        <td
          class="text-capitalize"
          :class="
            search && item.country.includes(search)
              ? 'blue lighten-4 black--text'
              : null
          "
        >
          <text-highlight :queries="search">
            {{ item && item.country }}
          </text-highlight>
        </td>
      </template>

      <template #[`item.capital`]="{ item }">
        <td
          class="text-capitalize"
          :class="
            search && item.capital.includes(search)
              ? 'blue lighten-4 black--text'
              : null
          "
        >
          <text-highlight :queries="search">
            {{ item && item.capital }}
          </text-highlight>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CountryTable',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        { text: '', value: 'action', sortable: false },
        { text: 'Flag', value: 'flag', width: '5%', sortable: false },
        {
          text: 'Name',
          value: 'country',
          width: '40%',
        },
        { text: 'Region', value: 'region' },
        { text: 'Capital', value: 'capital' },
      ],
      search: '',
    }
  },
  computed: {
    ...mapGetters(['loading', 'countries', 'searchData', 'favouriteCountries']),
    selectedCountries: {
      get() {
        return this.favouriteCountries
      },
      set(newValue) {
        this.setFavourite(newValue)
      },
    },
    tableData() {
      if (this.search) {
        return this.searchData
      } else {
        return this.countries
      }
    },
  },
  methods: {
    ...mapActions(['getAllCountries', 'searchCountry', 'setFavourite']),
    searchKeyword: _.debounce(function () {
      this.searchCountry(this.search)
    }, 600),
  },
}
</script>
