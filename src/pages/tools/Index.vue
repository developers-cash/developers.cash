<template>
  <q-page>
    <div class="outer-container hero-container q-pb-xl">
      <div class="text-white inner-container bg-transparent">
          <div class="q-pt-xl q-pb-xl text-center">
            <p class="text-subtitle1 q-mt-xl" style="color:#999; font-size:2.5rem; opacity:0.6;">
              &lt;LibCash-JS&gt;
            </p>
            <h1 class="text-primary text-weight-bold animated pulse infinite slow">Tools</h1>
            <div class="q-mb-xl">
              <p class="text-subtitle1">
                A collection of Bitcoin Cash Tools that may assist with testing
              </p>
            </div>
            <!--
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
            -->
          </div>
      </div>
    </div>

    <div class="outer-container">
      <div class="inner-container q-pt-xl q-pb-xl">
        <div class="row">
          <div class="col-3">
            <div class="left-nav">
              <div class="left-nav-title">Tools</div>
              <ul>
                <template v-for="tool in tools">
                <li v-for="action in tool.actions">
                  <template v-if="action.type === 'external-link'">
                    <a :href="action.url" target="_blank">{{ action.title }}</a>
                  </template>
                  <template v-if="action.type === 'internal-link'">
                    <router-link :to="action.url">{{ action.title }}</router-link>
                  </template>
                </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="col-9">
            <router-view />
          </div>
        </div>
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
  computed: {
    resources() {
      return this.$store.state.app.resources;
    },
    tools() {
      let arr = [];
      for (let name in this.resources) {
        let resource = this.resources[name];
        if (resource.category === 'Tools')  {
          arr.push(resource);
        }
      }
      return arr;
    }
  },
  data () {
    return {
      documentation: 'asdf'
    }
  }
}
</script>
