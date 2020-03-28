<template>
  <div v-if="documentation">
    <div class="row">
      <div class="col-3 left-nav">
        <div v-if="title" class="left-nav-title">{{ title }}</div>
        <DocNavigation ref="docNav" :documentation="documentation" @clicked="onDocNavigationClicked" />
      </div>
      <div class="col-9">
        <DocContent :documentation="active" />
      </div>
    </div>
  </div>
</template>

<script>
import DocNavigation from './DocumentationJS/Navigation'
import DocContent from './DocumentationJS/Content'

export default {
  name: 'DocumentationJS',
  components: { DocNavigation, DocContent },
  props: {
    title: {
      type: String,
    },
    documentation: {
      type: Array
    }
  },
  data() {
    return {
      active: this.documentation[0]
    }
  },
  methods: {
    onDocNavigationClicked: function(doc) {
      this.active = doc;
    },
  }
}
</script>

<style>
.link-card a {
  text-align: center;
  color: #333;
  text-decoration: none;
}

.link-card a div.text {
  font-size: 32px;
}

  .documentation-item .name {
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #019e8b;
  }

  .documentation-item .description {
    margin-bottom: 1.5rem;
  }

  .documentation-item .params .params-heading {
    font-weight: bold;
    margin-bottom: 0.5em;
    color:#999;
  }

  .documentation-item .params .param-name {
    display: inline-block;
    padding-right: 1rem;
    font-weight: bold;
    color: #019e8b;
  }

  .documentation-item .params .param-type {
    display: inline-block;
    font-style: italic;
    color: #999;
  }

  .documentation-item {
    margin-bottom: 2rem;
    border-bottom: 1px solid #999;
  }

  .documentation-item .examples {
    margin-bottom: 3rem;
  }

  .documentation-item .examples .examples-heading {
    font-weight: bold;
  }

  .documentation-item.level-0 {

  }

  .documentation-item.level-0 .name {
    font-size: 4rem;
  }

  .documentation-item.level-0 .description {
    font-size: 1.5rem;
  }

  .documentation-item.level-0 .params {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }

  .documentation-item.level-0 .members .heading {
    font-size: 1.25rem;
    font-style: italic;
    margin-bottom: 2em;
    border-bottom: 1px solid #999;
    border-top: 1px solid #999;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .documentation-item.level-1 .name {
    font-size: 2rem;
    font-weight: bold;
  }

  .documentation-item.level-1 .description {
    font-size: 1.0rem;
  }

  .documentation-item.level-1 .params {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
</style>
