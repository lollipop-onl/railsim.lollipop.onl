<template>
  <div
    class="app-placeholder"
    :class="{'-text': length != null}"
    :style="style"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AppPlaceholder extends Vue {
  /** 文字置換時の幅 */
  @Prop({ type: Number }) length?: number;

  /** Placeholderのスタイル */
  get style() {
    const style: Record<string, any> = {};

    if (this.length != null) {
      style.width = `${this.length}em`;
    }

    return style;
  }
}
</script>

<style lang="sass" scoped>
@keyframes  pulse
  0%
    background: #e0e0e0
  50%
    background: #cecece
  100%
    background: #e0e0e0

.app-placeholder
  &
    background: #e0e0e0
    border-radius: $layout-radius-md
    animation: pulse 1.5s infinite ease-in-out

  &.-text
    max-width: 100%
    height: 1em
</style>
