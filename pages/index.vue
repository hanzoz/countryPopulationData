<template>
  <client-only>
    <v-row justify="center" align="center">
      <v-col :cols="8">
        <CountryTable />

        <BarChart v-if="favouriteCountries.length > 0" class="mt-5" />
      </v-col>

      <v-col cols="4" align-self="start">
        <CountryList />
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters(['favouriteCountries']),
  },
  mounted() {
    this.getAllCountries()
  },
  methods: {
    ...mapActions(['getAllCountries']),
  },
}
</script>
