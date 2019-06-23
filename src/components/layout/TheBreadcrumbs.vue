<template>
  <ol class="breadcrumbs-nav">
    <li class="item">
      <n-link
        class="link"
        to="#"
      >
        トップ
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="link"
        to="#"
      >
        プラグイン検索プラグイン検索プラグイン検索プラグイン検索
      </n-link>
    </li>
    <li class="item">
      <span class="link">プラグイン検索プラグイン検索プラグイン検索プラグイン検索プラグイン検索</span>
    </li>
  </ol>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheBreadcrumbs extends Vue {
}
</script>

<style lang="sass" scoped>
.breadcrumbs-nav
  &
    display: flex
    align-items: center

  & > .item
    display: flex
    min-width: 0

  & > .item:first-child
    flex-shrink: 0

  & > .item:not(:last-child)::after
    margin: 0 $layout-margin-xsm
    content: ''
    font-family: Ionicons
    font-size: $font-sm
    color: rgba($_text, $_light-sm)

  & > .item > .link
    +text-ellipsis
    display: block
    font-size: $font-sm
    color: $_text
    text-decoration: none

  & > .item > .link[href]
    color: $_text-link
    transition: opacity 0.12s ease

  & > .item > .link[href]:hover
    opacity: $_light-md
</style>
