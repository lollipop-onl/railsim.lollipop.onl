<template>
  <div class="admin-content">
    <div class="title">
      {{ title }}
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AdminContent extends Vue {
  /** タイトル */
  @Prop({ type: String, required: true }) title: string;
}
</script>

<style lang="sass" scoped>
.admin-content
  & > .title
    padding: 12px 0 14px
    margin-bottom: 24px
    font-size: 16px
    font-weight: bold
</style>
