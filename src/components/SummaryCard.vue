<template>
    <q-card class="col-4" flat bordered>
      <div class="summary-card-img" :style="resource.background ? `background:${resource.background}` : ''">
        <div v-if="resource.warning" class="absolute-bottom-right">
          <q-chip color="red" text-color="white" :label="resource.warning" />
        </div>
        <q-img
          :src="resource.logo ? resource.logo : `/statics/generic-logo/${resource.category}.svg`"
          style="height: 350px; max-width:100%"
          contain
        />
      </div>

      <q-card-section>
        <div class="text-overline text-orange-9">{{ resource.subheading }}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{ resource.title }}</div>
        <div class="q-mb-xs">
          <q-chip v-for="tag in resource.tags" :key="tag" dense>{{ tag }}</q-chip>
        </div>
        <div class="text-caption text-grey">
          {{ resource.description }}
        </div>
      </q-card-section>

      <q-card-actions>
        <span v-for="(link, i) in resource.links" :key="i">
          <q-btn flat color="dark" :label="link.title" type="a" :href="link.url" target="_blank" icon="link" />
        </span>
        <span v-for="(action, key) in resource.actions" :key="key">
          <q-btn flat color="dark" :label="action.title" type="a" :href="action.url" target="_blank" icon="link" />
        </span>
      </q-card-actions>
    </q-card>
</template>

<script>
export default {
  name: 'SummaryCard',
  props: [ 'resource' ]
}
</script>

<style>
  .summary-card-img {
    position: relative;
    padding-left:40px;
    padding-right:40px;
    background: #46473e;
  }
</style>
