<template>
  <div class="banner-carousel-slide">
    <img
      class="image"
      src="~/assets/images/dev/banner.png"
      alt="Banner"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class BannerCarouselSlide extends Vue {
}
</script>

<style lang="sass" scoped>
.banner-carousel-slide
  & > .image
    width: 100%
    height: 320px
    object-fit: cover
</style>
