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
        <span v-for="(action, key) in resource.actions" :key="key">
          <template v-if="action.type === 'external-link'">
            <q-btn flat color="dark" :label="action.title" type="a" :href="action.url" target="_blank" icon="link" />
          </template>
          <template v-else-if="action.type === 'internal-link'">
            <q-btn flat color="dark" :label="action.title" :to="action.url" />
          </template>
          <template v-else>
            <q-btn flat color="dark" :label="action.title" :to="`/resource/${resource.id}/${key}`" />
          </template>
        </span>

        <!--
        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
        -->
      </q-card-actions>

      <!--
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ resource.description }}
          </q-card-section>
        </div>
      </q-slide-transition>
      -->
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
