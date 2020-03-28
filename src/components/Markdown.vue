<template>
  <q-page>
    <div class="markdown-body" v-html="content"></div>
  </q-page>
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  created() {
    let md = new MarkdownIt();
    this.content = md.render(this.markdown);
  },
  props: ['markdown'],
  data () {
    return {
      content: 'asdf'
    }
  }
}
</script>
