<template>
  <q-page>
    <div class="outer-container hero-container q-pb-xl">
      <div class="text-white inner-container bg-transparent">
          <div class="q-pt-xl q-pb-xl text-center">
            <p class="text-subtitle1 q-mt-xl" style="color:#999; font-size:2.5rem; opacity:0.6;">
              &lt;NodeJS&gt;
            </p>
            <h1 class="text-primary text-weight-bold animated pulse infinite slow">{{ resource.title }}</h1>
            <div class="q-mb-xl">
              <p class="text-subtitle1">
                {{ resource.description }}
              </p>
            </div>
            <div>
              <span v-for="opts, action) in resource.actions" :key="action">
                <template v-if="opts.type === 'external-link'">
                  <q-btn class="q-mt-md q-ma-md button-link" color="accent" size="lg" :label="opts.title" icon="list" type="a" :href="opts.url" target="_blank" />
                </template>
                <template v-else>
                  <q-btn class="q-mt-md q-ma-md button-link" color="accent" size="lg" :label="opts.title" icon="list" :to="action" />
                </template>
              </span>
            </div>
          </div>
      </div>
    </div>

    <div class="outer-container">
      <div class="inner-container q-pt-xl q-pb-xl">
        <template v-if="resource.actions[$route.params.action].type === 'documentationjs'">
          <DocumentationJS :documentation="$store.state.app.currentResource.documentation" :title="resource.title" />
        </template>
        <template v-if="resource.actions[$route.params.action].type === 'markdown'">
          <Markdown :markdown="$store.state.app.currentResource.markdown" />
        </template>
      </div>
    </div>

  </q-page>
</template>

<script>
import Axios from 'axios'
import AppModule from '../../store/app'
import DocumentationJS from '../../components/DocumentationJS'
import Markdown from '../../components/Markdown'

export default {
  components: { DocumentationJS, Markdown },
  async preFetch ({ store, currentRoute }) {
    return new Promise((resolve) => {
      let resource = store.state.app.resources[currentRoute.params.name];
      let action = currentRoute.params.action;

      // If it's documentationjs format...
      if (resource.actions[action].type === 'documentationjs') {
        Axios.get(resource.actions[action].source).then((data) => {
          store.commit('app/setCurrentResource', {
            documentation: data.data
          });

          resolve();
        });
      }

      // If it's markdown format...
      if (resource.actions[action].type === 'markdown') {
        Axios.get(resource.actions[action].source).then((data) => {
          store.commit('app/setCurrentResource', {
            markdown: data.data
          });

          resolve();
        });
      }
    });
  },
  computed: {
    resource() {
      return this.$store.state.app.resources[this.$route.params.name];
    }
  },
  data () {
    return {
      documentation: 'asdf'
    }
  }
}
</script>
