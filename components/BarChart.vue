<template>
  <div>
    <div class="title">Population Bar Chart</div>

    <apexChart
      :key="'chart' + chartKey"
      type="bar"
      height="350"
      :options="chartOptions"
      :series="chartSeries"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      chartKey: 0,
      chartSeries: [
        {
          name: 'Population',
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
          labels: {
            style: {
              colors: ['#ffffff'],
            },
            formatter(value) {
              // format to thousand separator
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: ['#ffffff'],
              cssClass: 'text-capitalize',
            },
          },
        },
        tooltip: {
          theme: 'dark',
          x: {
            formatter(string) {
              // format the country name to capitalize
              return string
                .toLowerCase()
                .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())
            },
          },
          y: {
            formatter(value) {
              // format to thousand separator
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },
          },
        },
      },
    }
  },
  computed: {
    ...mapGetters(['country', 'population']),
  },
  watch: {
    country: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.chartSeries[0].data = this.population
          this.chartKey += 1
        }
      },
    },
    population: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.chartOptions.xaxis.categories = this.country
        }
      },
    },
  },
}
</script>
