<template>
  <header class="the-header">
    <n-link
      to="/"
      class="logo"
    >
      <img
        class="image"
        src="~assets/images/common/logo.svg"
        alt="RailSimPluginStore"
      >
    </n-link>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheHeader extends Vue {


}
</script>

<style lang="sass" scoped>
.the-header
  &
    box-sizing: border-box
    display: flex
    align-items: center
    width: 100%
    height: 56px
    padding: 0 $layout-margin-md
    background: $_primary

  & > .logo
    margin-right: auto
</style>
