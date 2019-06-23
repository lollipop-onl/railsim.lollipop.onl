<template>
  <div>
    <BannerCarousel />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import BannerCarousel from '@/components/page/top/BannerCarousel.vue';

@Component({
  components: {
    BannerCarousel,
  },
})
export default class IndexPage extends Vue {
}
</script>

<style lang="sass" scoped></style>
