<template>
  <n-link
    :class="{ 'app-plugin-tag': true, '-category': category }"
    to="#"
  >
    <slot />
  </n-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AppPluginTag extends Vue {
  /** カテゴリかどうか */
  @Prop({ type: Boolean, default: false }) category: boolean;
}
</script>

<style lang="sass" scoped>
.app-plugin-tag
  &
    +text-ellipsis
    box-sizing: border-box
    display: inline-block
    max-width: 18em
    min-width: 4em
    height: 20px
    padding: 0 $layout-margin-xsm
    margin-bottom: $layout-margin-xsm
    font-size: $font-sm
    color: $_text
    line-height: 18px
    text-align: center
    text-decoration: none
    border: 1px solid #ccc
    border-radius: $layout-radius-sm
    transition: opacity 0.12s ease

  &:not(:last-child)
    margin-rignt: $layout-margin-xsm

  &.-category
    background: #dfdfdf
    border: none

  &.-category::before
    margin-right: $layout-margin-xsm / 2
    content: ''
    font-family: Ionicons

  &:hover
    opacity: $_light-md
</style>
