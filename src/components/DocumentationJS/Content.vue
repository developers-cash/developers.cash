<template>
  <div v-if="documentation" :class="`documentation-item level-${depth}`">

    <!-- Module Name -->
    <div class="name">{{ documentation.name }}</div>

    <!-- Module Description -->
    <div v-if="documentation.description" class="description">
      <p v-for="(paragraph, i) in parseDescription(documentation.description)" :key="i">{{ paragraph }}</p>
    </div>

    <!-- Module Params -->
    <div v-if="documentation.params.length" class="params">
      <div class="params-heading">Arguments</div>
      <ul>
        <li v-for="param in documentation.params">
          <div v-if="param.name" class="param-name">{{ param.name }}</div>
          <div v-if="param.type" class="param-type">&lt;{{ param.type.name }}&gt;</div>
          <template v-if="param.description">
            <div v-for="paragraph in parseDescription(param.description)" class="vuedoc-members-params-description">{{ paragraph }}</div>
          </template>
        </li>
      </ul>
    </div>

    <!-- Module Examples -->
    <div v-if="documentation.examples.length" class="examples">
      <div class="examples-heading">Examples</div>
      <template v-for="example in documentation.examples">
        <prism language="javascript" :code="example.description"></prism>
      </template>
    </div>

    <!-- Members -->
    <div v-if="documentation.members" class="members">
      <!-- Static Members -->
      <div v-if="documentation.members.static.length">
        <div class="heading">Static Members</div>
        <Content v-for="member in documentation.members.static" :documentation="member" :depth="depth + 1" />
      </div>

      <!-- Instance Members -->
      <div v-if="documentation.members.instance.length">
        <div class="heading">Instance Members</div>
        <Content v-for="member in documentation.members.instance" :documentation="member" :depth="depth + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import Prism from 'vue-prismjs'
import 'prismjs/themes/prism-okaidia.css'

export default {
  name: 'Content',
  components: { Prism },
  props: {
    documentation: {
      type: Object,
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: {},
    }
  },
  created() {
    this.active = this.documentation[0];
  },
  methods: {
    parseDescription: function(description) {
      let res = [];
      if (description && description.children) {
        description.children.forEach(paragraph => {
          if (paragraph.children) {
            paragraph.children.forEach(text => {
              if (text.type === 'text') {
                res.push(text.value);
              }
            });
          }
        });
      }
      return res;
    },
    renderCode: function(code) {
      return Prism.highlight(code, Prism.languages.javascript, 'javascript');
    }
  }
}
</script>
