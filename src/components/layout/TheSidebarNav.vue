<template>
  <ul class="sidebar-nav">
    <li class="item">
      <n-link
        class="link"
        to="#"
      >
        プレスリリース
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="link"
        to="#"
      >
        ヘルプ
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="link"
        to="#"
      >
        RailSimPluginStoreについて
      </n-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheSidebarNav extends Vue {


}
</script>

<style lang="sass" scoped>
.sidebar-nav
  & > .item:not(:last-child)
    margin-bottom: $layout-margin-sm

  & > .item > .link
    font-size: $font-sm
    color: rgba($_primary, $_light-sm)
    text-decoration: none

  & > .item > .link:hover
    text-decoration: underline
</style>
