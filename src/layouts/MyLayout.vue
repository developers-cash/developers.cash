<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="text-white" style="background:#22293a">
      <q-toolbar>
        <q-toolbar-title id="nav-branding">
          <router-link to="/" class="toolbar-title">
              <img src="~assets/logo.svg" alt="Bounty.Cash" title="Developers.Cash" class="q-pa-sm" />
              Developers.Cash
          </router-link>
        </q-toolbar-title>
        <q-select
          dense
          outlined
          square
          :multiple="false"
          v-model="search.value"
          use-input
          input-debounce="0"
          label="Search"
          :options="search.filtered"
          @filter="filterResources"
          style="width: 250px"
          class="bg-white q-mr-md"
          @input="onSelected"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <!--<q-btn stretch flat label="Services" icon="arrow_right_alt" to="/" />
        <q-btn stretch flat label="SDK's" icon="code" to="/api" />
        <q-btn stretch flat label="Tutorials" icon="code" to="/own-node" />
        <q-btn stretch flat label="Tools" icon="list" to="/example" />
        <q-btn stretch flat icon="code" type="a" href="https://github.com" />
        <q-btn stretch flat label="Tools" icon="list" to="/example" />
        -->
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  computed: {
    resources() {
      return this.$store.state.app.resources;
    },
    resourcesArray() {

    },
  },
  data () {
    return {
      search: {
        resources: [],
        filtered: [],
        value: ''
      },
    }
  },
  created() {
    for (let key in this.resources) {
      this.search.resources.push(key);
    }
  },
  methods: {
    filterResources: function(val, update) {
      update(() => {
        if (!val) return;

        const needle = val.toLowerCase();
        this.search.filtered = this.search.resources.filter(v => {
          if (this.resources[v].title.toLowerCase().includes(needle)) {
            return true;
          }

          if (this.resources[v].tags.includes(needle)) {
            return true;
          }
        });
      })
    },
    onSelected: function(val) {
      if (!val) return;

      this.search.value = '';
      let resource = this.resources[val];
      let firstAction = Object.keys(resource.actions)[0];
      let action = resource.actions[firstAction];
      if (action.type === 'internal-link') {
        this.$router.push(action.url);
      } else if (action.type === 'external-link') {
        window.location.href = action.url;
      } else {
        this.$router.push(`/resource/${val}/${firstAction}`);
      }
    }
  }
}
</script>

<style>

#nav-branding img {
    vertical-align: middle;
    height: 60px;
}

#nav-branding a {
    color:#fff;
    text-decoration: none;
}
</style>
