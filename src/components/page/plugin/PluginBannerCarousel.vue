<template>
  <div class="plugin-carousel">
    <div class="main">
      <img
        src="~assets/images/dev/banner.png"
        class="image"
      >
    </div>
    <ul class="other-images">
      <li class="item">
        <img
          src="~assets/images/dev/banner.png"
          class="image"
        >
      </li>
      <li class="item">
        <img
          src="~assets/images/dev/banner.png"
          class="image"
        >
      </li>
      <li class="item">
        <img
          src="~assets/images/dev/banner.png"
          class="image"
        >
      </li>
      <li class="item">
        <img
          src="~assets/images/dev/banner.png"
          class="image"
        >
      </li>
      <li class="item">
        <img
          src="~assets/images/dev/banner.png"
          class="image"
        >
      </li>
      <li class="item">
        <img
          src="~assets/images/dev/banner.png"
          class="image"
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class PluginBannerCarousel extends Vue {
}
</script>

<style lang="sass" scoped>
.plugin-carousel
  &
    display: flex
    align-items: stretch

    @media (max-width: 1200px)
      flex-direction: column

  & > .main
    position: relative
    flex-shrink: 0
    width: 780px

    @media (max-width: 1200px)
      width: 100%

  & > .main::before
    display: block
    padding-top: 56.25%
    content: ''

  & > .main > .image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover

.other-images
  &
    display: flex
    flex-direction: column
    flex-grow: 1
    margin-left: $layout-margin-xsm

    @media (max-width: 1200px)
      flex-direction: row
      width: 100%
      height: 64px
      margin-top: $layout-margin-xsm
      margin-left: 0

  & > .item
    position: relative
    flex-grow: 1

  & > .item:not(:last-child)
    margin-bottom: $layout-margin-xsm

    @media (max-width: 1200px)
      margin-right: $layout-margin-xsm
      margin-bottom: 0

  & > .item > .image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
</style>
