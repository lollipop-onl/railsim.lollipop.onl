<template>
  <ul class="plugin-list">
    <template v-for="plugin in pluginList">
      <AppPluginListItem
        :key="plugin.id"
        class="item"
        :plugin="plugin"
      />
    </template>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import AppPluginListItem from '@/components/ui/AppPluginListItem.vue';
import { Plugin } from '@/models';

@Component({
  components: {
    AppPluginListItem,
  },
})
export default class AppPluginList extends Vue {
  @Prop({ type: Array, default: () => [] })
  pluginList: Plugin;
}
</script>

<style lang="sass" scoped>
.plugin-list
  &
    display: flex
    flex-wrap: wrap
    margin-bottom: -$layout-margin-md

  & > .item
    width: calc((100% - #{$layout-margin-sm * 2}) / 3)
    margin-bottom: $layout-margin-md

  & > .item:not(:nth-child(3n))
    margin-right: $layout-margin-sm
</style>
