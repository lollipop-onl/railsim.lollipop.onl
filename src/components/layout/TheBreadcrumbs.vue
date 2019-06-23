<template>
  <ol class="breadcrumbs-nav">
    <li class="item">
      <n-link
        class="link"
        to="/"
      >
        トップ
      </n-link>
    </li>
    <template v-for="({ title, to }) in breadcrumbs">
      <li
        :key="title"
        class="item"
      >
        <div
          :is="to ? 'n-link' : 'span'"
          class="link"
          :to="to"
        >
          {{ title }}
        </div>
      </li>
    </template>
  </ol>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { IBreadcrumbs } from '@/types/layout';

@Component
export default class TheBreadcrumbs extends Vue {
  /** パンくずリスト */
  @Prop({ type: Array, required: true }) breadcrumbs: IBreadcrumbs[];
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
