# Country List with population data

This app is using api data from [Rest Countries](https://restcountries.com/) where it will generate population bar chart data on the fly while selecting country.

This web app can be reach on [rest country population](https://restcountrypopulation.herokuapp.com/).
:warning: When you visit the url for the first time, it will need some time to wake up because it is a free serverless hosting from heroku.

**Features include:**

- Country list in tabular format with `flag`, `name`, `region` and `capital` with sorting function
- Country & capital name filterable with `keyword` and keyword will be `highlighted` in the search result
- Generate population `bar chart` from the list of selected coutries automatically
- List item of selected countries from user where it will store in localstorage and a function to remove it from localstoage

## Installation

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev
```

## Code description

#### 1. `BarChart.vue` components

This is where the bar chart data will be generated based on `country` and `population` computed from vuex store data.

- The following 2 functions are the one I use to convert the data and make it more presentable in the graph.

* Convert the population data using thousand separator because the data return from restcountries API is not comma separator and hard to read on the graph.

```
formatter(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
},
```

- Convert the country name as text capitalize because I convert the country and capital name to lower case which I store the data in the vuex store. This is to make the filter data more easier.

```
formatter(string) {
  return string
    .toLowerCase()
    .replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())
},
```

#### 2. `CountryTable` components

This is the ccomponent to show the country list in tabular format.

- There are 2 section in this component which is `search bar` and `table` and it use data from either `countries` and `searchData`. Why is there 2 different data?, it is because when user filter data using search bar, the `searchKeyword` function will create another set of country list data without call the api again which will lessen the api stress every time user filter data using keyword. so from here, when the user clear the filter result the table will use back the `countries` data from the store state.

1. Data Table
   This data table is populated using `countries` data from vuex store state.

There is a checkbox on each row where it will trigger `setFavourite` store action using `selectedCountries` v-model to set favourite to the `favouriteCountries` store state and it will be store in localstorage using `vuex-Persistedstate` plugin. From this, every time the user refresh the page it will retain the `favouriteCountries` without clearing the state.

2. Search bar
   The search bar using `onKeyUp` event via the text-field and fire `searchKeyword` method and filter the table data using keyword being provided.

This process will be using `searchCountry` from store action to filter data and pass it to searchData store state in vuex.

The search keyword will be highlighted in the table cell using `textHighlight` plugin and the table cell will have a background color where match the keyword found.

#### 3. `CountryList` components

This is an additional component to show the selected countries and user can use it to `remove` selected countries from the `selectedCountries` store state or uncheck it from the table.

From the table setup, there is a pagination of 10 items per page, and its not very convenient to go through pages to uncheck it after the user selected multiple countries from different pages or selected by using search result.

## App Tech Stacks

- [Nuxt.js](https://nuxtjs.org)
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [ApexCharts](https://apexcharts.com/docs/vue-charts/)
- [vuex-persistedstate](https://github.com/robinvdvleuten/)
- [Text Highlight](https://github.com/AlbertLucianto/vue-text-highlight/)
- [Axios](https://github.com/axios/axios/)
