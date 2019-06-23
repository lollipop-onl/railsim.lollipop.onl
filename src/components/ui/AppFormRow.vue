<template>
  <div
    :is="wrapper"
    class="app-form-row"
  >
    <div class="label">
      {{ title }}
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AppFormRow extends Vue {
  /** フィールドタイトル */
  @Prop({ type: String, required: true }) title: string;

  /** ラッパータグ */
  @Prop({ type: String, default: 'label' }) wrapper: string;
}
</script>

<style lang="sass" scoped>
.app-form-row
  &
    display: flex
    width: 100%
    min-height: 42px
    margin-bottom: $layout-margin-lg

  & > .label
    flex-shrink: 0
    width: 100px
    margin: 11px 0
    font-size: $font-md
    font-weight: bold
    line-height: 20px

  & > .content
    flex-grow: 1
</style>
