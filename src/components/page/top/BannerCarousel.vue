<template>
  <div>
    <div class="banner-carousel">
      <div
        class="carousel"
        :style="carouselStyle"
        @mouseover="stopTimer"
        @mouseout="resetTimer"
      >
        <template v-for="(_, i) in 3">
          <BannerCarouselSlide
            :key="i"
            :active="i === activeSlideIndex"
            class="slide"
          />
        </template>
      </div>
    </div>
    <BannerCarouselBullets
      class="carousel-bullets"
      :current="activeSlideIndex"
      @change="slideTo"
    />
  </div>
</template>

<script lang="ts">
import { bind } from 'helpful-decorators';
import { Component, Vue } from 'nuxt-property-decorator';
import BannerCarouselSlide from '@/components/page/top/BannerCarouselSlide.vue';
import BannerCarouselBullets from '@/components/page/top/BannerCarouselBullets.vue';

@Component({
  components: {
    BannerCarouselSlide,
    BannerCarouselBullets,
  },
})
export default class BannerCarousel extends Vue {
  /** アクティブなスライドのIndex */
  activeSlideIndex = 0;

  /** 自動再生のタイマーID */
  timerId = 0;

  /** カルーセルのスタイル */
  get carouselStyle() {
    return {
      transform: `translate3d(-${(this.activeSlideIndex / 3) * 100}%, 0, 0)`,
    };
  }

  /** ライフサイクル */
  mounted(): void {
    this.resetTimer();
  }

  /**
   * カルーセルをスライドさせる
   */
  @bind
  slideTo(index = this.activeSlideIndex + 1): void {
    const optimizedIndex = index % 3;

    this.activeSlideIndex = optimizedIndex;
    this.resetTimer();
  }

  /**
   * タイマーをリセットする
   */
  resetTimer(): void {
    this.stopTimer();
    this.timerId = setTimeout(this.slideTo, 3000);
  }

  /**
   * タイマーをストップする
   */
  stopTimer(): void {
    clearInterval(this.timerId);
  }
}
</script>

<style lang="sass" scoped>
.banner-carousel
  &
    width: 100%
    overflow: hidden

  & > .carousel
    display: flex
    width: 300%
    transition: transform 0.8s $ease-in-out-quart

  & > .carousel > .slide
    flex-grow: 1

.carousel-bullets
  &
    margin-top: $layout-margin-xsm
</style>
