<template>
  <div
    :is="to ? 'n-link' : 'button'"
    v-bind="$attrs"
    class="app-button"
    :class="{[theme]: true}"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AppButton extends Vue {
  /** ボタンのテーマ */
  @Prop({ type: String, default: 'primary' })
  readonly theme: string;

  /** リンク先URL */
  @Prop({ type: String })
  readonly to?: string;
}
</script>

<style lang="sass" scoped>
.app-button
  &
    @extend .button-base
</style>
