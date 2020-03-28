<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import Axios from 'axios'
import AppModule from './store/app'
import Resources from '../resources.json'

export default {
  name: 'App',
  async preFetch ({ store, currentRoute }) {
    store.commit('app/setResources', Resources);
    return true;
  },
}
</script>
