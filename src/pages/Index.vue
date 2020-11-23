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

<style>
@media screen and (max-width: 1023px) {
  h1.text-primary {
    font-size: 4rem
  }
}

@media screen and (max-width: 599px) {
  h1.text-primary {
    font-size: 2.5rem
  }
}
</style>

<script>
import Resources from '../../resources'
import SummaryCard from '../components/SummaryCard'

export default {
  components: { SummaryCard },

  data () {
    return {
      categories: {},
      filter: {
        value: '',
        options: [],
        suggestions: []
      },
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Title',
          field: row => row.title,
          sortable: true,
          align: 'left',
        },
        {
          name: 'subheading',
          required: true,
          label: 'Subheading',
          field: row => row.subheading,
          sortable: true,
          align: 'left',
        },
        {
          name: 'description',
          required: true,
          label: 'description',
          field: row => row.description,
          sortable: true,
          align: 'left',
        },
        {
          name: 'tags',
          required: true,
          label: 'tags',
          field: row => row.tags,
          sortable: true,
          align: 'left',
        },
      ],
      pagination: {
        rowsPerPage: 6 // current rows per page being displayed
      }
    }
  },

  created() {
      // Create categories
      let categories = { };
      for (let resource of Resources) {
        categories[resource.category] = false;
      }
      this.categories = categories;

      // Compile suggestions for filter
      for (let resource of Resources) {
        this.filter.suggestions.push(resource.title)
        this.filter.suggestions.push(resource.subheading)
        resource.tags.forEach(tag => this.filter.suggestions.push(tag))
      }

      // Make values in suggestions array unique
      this.filter.suggestions = [...new Set(this.filter.suggestions)]
  },

  computed: {
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
      for (let resource of Resources) {
        if (resource.category === category) {
          asArray.push(resource);
        }
      }
      return asArray;
    },

    useIcon(category) {
      switch (category) {
        case 'Node Software': return 'cloud_circle'
        case 'Community': return 'people'
        case 'Libraries': return 'code'
        case 'Network': return 'device_hub'
        case 'Services': return 'cloud'
        case 'Self-Hosted': return 'cloud_download'
        case 'Tools': return 'build'
        default: return 'school';
      }
    },

    filterResources: function(val, update) {
      update(() => {
        if (!val) return;

        const needle = val.toLowerCase();
        this.filter.options = this.filter.suggestions.filter(v => v.toLowerCase().startsWith(needle))
      })
    },

    setFilter: function(val) {
      this.filter.value = val
    }
  }
}
</script>
