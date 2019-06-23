<template>
  <section class="plugin-introduction">
    <h1 class="title">
      {{ title }}
    </h1>
    <div class="content">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class PluginIntroduction extends Vue {
  /** プラグイン名 */
  @Prop({ type: String, required: true }) title: string;
}
</script>

<style lang="sass" scoped>
.plugin-introduction
  & > .title
    font-size: $font-xlg
    line-height: 1.5

  & > .content
    font-size: $font-md
    line-height: 1.5
    white-space: pre-wrap
</style>
