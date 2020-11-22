<template>
  <q-page>
    <div class="outer-container hero-container q-pb-xl">
      <div class="text-white inner-container bg-transparent">
          <div class="q-pt-xl q-pb-xl text-center">
            <p class="text-subtitle1 q-mt-xl" style="color:#999; font-size:2.5rem; opacity:0.6;">
              &lt;Bitcoin Cash&gt;
            </p>
            <h1 class="text-primary text-weight-bold animated pulse infinite slow">Developers.Cash</h1>
            <div class="q-mb-xl">
              <p class="text-subtitle1 q-mb-xl">
                Useful developer resources for building the Internet of Cash
              </p>
            </div>

            <!-- Search -->
            <div class="q-mb-md">
              <q-select
                outlined
                square
                style="width: 400px; max-width: 90%; margin: auto;"
                class="bg-white q-mr-md"
                :value="filter.value"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                label="Search"
                :options="filter.options"
                @filter="filterResources"
                @input-value="setFilter"
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
            </div>

            <div>

              <!-- Buttons -->
              <span v-for="(visible, category) in categories">
                <q-btn
                  :label="category"
                  class="q-mt-md q-ma-md button-link"
                  @click="categories[category] = !categories[category]"
                  :color="categories[category] ? 'primary' : 'accent'"
                  size="lg"
                  :icon="useIcon(category)" />
              </span>
              <!-- End Buttons -->

            </div>
          </div>
      </div>
    </div>

    <div class="outer-container">
      <div class="inner-container q-pt-xl q-pb-xl">

        <div v-for="(visible, category) in categories">
          <q-table v-if="categories[category] || noCategoryFilter" :grid="true" :data="getCategory(category)" :columns="columns" :pagination.sync="pagination" row-key="name" :title="category" :filter="filter.value">
            <div slot="item" slot-scope="props" class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-4 transition-generic">
              <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

                <SummaryCard :resource="props.row" />

              </transition>
            </div>
            <div slot="bottom"></div>
          </q-table>
        </div>

      </div>
    </div>

  </q-page>
</template>

<script>
import Resources from '../../resources1'
import SummaryCard from '../components/SummaryCard'

export default {
  components: { SummaryCard },

  created() {
      let categories = { };
      for (let i in this.resources) {
        categories[this.resources[i].category] = false;
      }
      this.categories = categories;
  },

  computed: {
    resources() {
      return Resources;
    },
    noCategoryFilter() {
      for (let key in this.categories) {
        if (this.categories[key]) return false;
      }
      return true;
    }
  },

  methods: {
    getCategory(category) {
      let asArray = [];
      for (let key in this.resources) {
        let resource = this.resources[key];
        if (resource.category === category) {
          asArray.push(Object.assign(resource, { id: key }));
        }
      }
      return asArray;
    },

    useIcon(category) {
      switch (category) {
        case 'Nodes': return 'cloud'
        case 'Services': return 'cloud'
        case 'Self-Hosted': return 'cloud_download'
        case 'Libraries': return 'code'
        case 'Tools': return 'build'
        default: return 'school';
      }
    },

    filterResources: function(val, update) {
      update(() => {
        if (!val) return;

        const needle = val.toLowerCase();
        /*this.filter.options = this.search.resources.filter(v => {
          if (this.resources[v].title.toLowerCase().includes(needle)) {
            return true;
          }

          if (this.resources[v].tags.includes(needle)) {
            return true;
          }
        });*/
      })
    },

    setFilter: function(val) {
      console.log('called')
      this.filter.value = val
    }
  },

  data () {
    return {
      categories: {},
      filter: {
        value: 'BCHD',
        options: []
      },
      columns: [
        {
          name: 'app',
          required: true,
          label: 'App/Service',
          field: row => row.title,
          sortable: true,
          align: 'left',
        },
      ],
      pagination: {
        rowsPerPage: 6 // current rows per page being displayed
      }
    }
  }
}
</script>
