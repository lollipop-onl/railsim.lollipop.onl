<template>
  <div class="banner-carousel-slide">
    <img
      class="image"
      src="~/assets/images/dev/banner.png"
      alt="Banner"
    >
    <div
      class="banner-content"
      :class="{'-active': active }"
    >
      <div class="label">
        by しもさんしぃ
      </div>
      <p class="text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, consectetur.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class TopBannerCarouselSlide extends Vue {
  /** アクティブなスライドかどうか */
  @Prop({ type: Boolean, required: true }) active: boolean;
}
</script>

<style lang="sass" scoped>
.banner-carousel-slide
  &
    position: relative

  & > .image
    width: 100%
    height: 320px
    object-fit: cover

.banner-content
  &
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height: 72px
    background-image: linear-gradient(to top, rgba($_black, $_light-lg), rgba($_black, 0))
    transition: opacity 0.3s 0.8s $ease-out-quint, transform 0.3s 0.8s $ease-out-quint

  &:not(.-active)
    opacity: 0
    transform: translate3d(0, 20px, 0)
    transition: opacity 0.12s $ease-in-quint, transform 0.12s $ease-in-quint

  & > .label
    position: absolute
    left: $layout-margin-sm
    bottom: 56px
    font-size: $font-xsm
    color: rgba($_white, $_light-sm)

  & > .text
    +text-ellipsis
    position: absolute
    left: $layout-margin-sm
    bottom: $layout-margin-md
    max-width: 80%
    font-size: $font-lg
    color: $_white
    line-height: 1.5
</style>
