<template>
  <div
    class="login-form-card"
    :class="{'-reverse': reverse}"
  >
    <div class="side">
      <img
        class="logo"
        src="~assets/images/common/logo.svg"
        alt="Logo"
      >
      <slot name="side" />
    </div>
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class LoginFormCard extends Vue {
  /** コンテンツを逆に表示するか */
  @Prop({ type: Boolean, default: false })
  readonly reverse: boolean;
}
</script>

<style lang="sass" scoped>
.login-form-card
  &
    display: flex
    width: 820px
    max-width: calc(100% - #{$layout-margin-md * 2})
    margin: 0 auto
    overflow: hidden
    box-shadow: 0 6px 24px rgba($_black, $_light-lg)
    border-radius: $layout-radius-md

  &.-reverse
    flex-direction: row-reverse

  & > .side
    position: relative
    display: flex
    flex-direction: column
    justify-content: center
    flex: 1 0
    background: $_primary

  & > .side > .logo
    display: block
    width: 210px
    margin: auto auto 0

  & > .main
    flex: 1 0
    padding: $layout-margin-xlg $layout-margin-lg
</style>
