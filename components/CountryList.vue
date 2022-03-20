<template>
  <v-card class="pa-5 rounded-lg">
    <div class="mb-5 title">Selected countries</div>

    <v-list-item v-for="(item, i) in favouriteCountries" :key="i">
      <template #default>
        <v-list-item-action>
          <v-icon color="red" @click="removeCountry(i)"> mdi-delete </v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title class="text-capitalize">{{
            item.country
          }}</v-list-item-title>
        </v-list-item-content>
      </template>
    </v-list-item>
  </v-card>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CountryList',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['favouriteCountries']),
  },
  methods: {
    ...mapMutations(['REMOVE_COUNTRY']),
    removeCountry(index) {
      this.REMOVE_COUNTRY(index)
    },
  },
}
</script>
