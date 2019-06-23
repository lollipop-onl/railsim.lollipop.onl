<template>
  <ol class="banner-carousel-bullets">
    <li
      v-for="(_, i) in 3"
      :key="i"
      :class="{ 'bullet': true, '-active': current === i}"
      @click="change(i)"
    >
      <div class="dot" />
    </li>
  </ol>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue,
} from 'nuxt-property-decorator';

@Component
export default class BannerCarouselBullets extends Vue {
  /** 現在のスライドのIndex */
  @Prop({ type: Number, required: true }) current: number;

  /** 変更を親へ通知 */
  @Emit() change(index: number) { return index; }
}
</script>

<style lang="sass" scoped>
.banner-carousel-bullets
  &
    display: flex
    justify-content: center

  & > .bullet
    flex-shrink: 0
    padding: $layout-margin-xsm

  & > .bullet:not(.-active)
    cursor: pointer

  & > .bullet > .dot
    box-sizing: border-box
    width: 10px
    height: 10px
    border: 1px solid $_primary
    border-radius: 50%

  & > .bullet.-active > .dot
    background: $_primary
</style>
