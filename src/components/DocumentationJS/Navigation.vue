<template>
  <ul v-if="documentation" class="documentation-nav">
    <li v-for="(item, i) in documentation">
      <a @click="emitClicked(item)">{{ item.name }}</a>
      <template v-if="depth < maxDepth">
        <Navigation ref="staticMembers" :documentation="item.members.static" :depth="depth + 1" @clicked="onClicked" />
        <Navigation ref="instanceMembers" :documentation="item.members.instance" :depth="depth + 1" @clicked="onClicked" />
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    documentation: {
      type: Array
    },
    depth: {
      type: Number,
      default: 0
    },
    maxDepth: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      active: 0,
      filterString: '',
    }
  },
  computed: {
    filteredNav() {
      //let childMatches = this.$refs.staticMembers.filter(term);
      //let childMatches = this.$refs.staticMembers.filter(term);

    }
  },
  methods: {
    onClicked: function(event) {
      this.emitClicked(event);
    },
    emitClicked: function(doc) {
      this.$emit('clicked', doc);
    },
    filter: function(term) {
      this.filterString = term;
    }
  }
}
</script>

<style>
  ul.documentation-nav {
    padding-left: 0;
    list-style-type: none;
  }

  ul.documentation-nav li {
    font-size:1.3rem;
  }
</style>
