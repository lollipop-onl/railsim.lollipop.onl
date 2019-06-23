<template>
  <ul class="plugin-list">
    <template v-for="i in 6">
      <AppPluginListItem
        :key="i"
        class="item"
      />
    </template>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppPluginListItem from '@/components/ui/AppPluginListItem.vue';

@Component({
  components: {
    AppPluginListItem,
  },
})
export default class AppPluginList extends Vue {
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
