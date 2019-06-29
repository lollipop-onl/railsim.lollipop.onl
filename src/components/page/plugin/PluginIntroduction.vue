<template>
  <section class="plugin-introduction">
    <h1 class="title">
      {{ title }}
    </h1>
    <!-- eslint-disable-next-line -->
    <div class="content">{{content}}</div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class PluginIntroduction extends Vue {
  /** プラグイン名 */
  @Prop({ type: String, required: true }) title: string;

  /** 本文 */
  @Prop({ type: String, required: true })
  content: string;
}
</script>

<style lang="sass" scoped>
.plugin-introduction
  & > .title
    margin-bottom: $layout-margin-md
    font-size: $font-xlg
    line-height: 1.5

  & > .content
    font-size: $font-md
    line-height: 1.5
    white-space: pre-wrap
</style>
