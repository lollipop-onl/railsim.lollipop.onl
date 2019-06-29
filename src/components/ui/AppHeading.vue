<template>
  <div class="app-heading">
    <h2 class="title">
      <slot />
    </h2>
    <n-link
      v-if="linkTo"
      class="link"
      :to="linkTo"
    >
      {{ linkText }}
    </n-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AppHeading extends Vue {
  /** リンクテキスト */
  @Prop({ type: String })linkText?: string;

  /** リンクURL */
  @Prop({ type: String })linkTo?: string;
}
</script>

<style lang="sass" scoped>
.app-heading
  &
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: $layout-margin-lg

  & > .title
    font-size: $font-lg

  & > .link
    font-size: $font-sm
    color: $_primary

  & > .link:hover
    text-decoration: none
</style>
