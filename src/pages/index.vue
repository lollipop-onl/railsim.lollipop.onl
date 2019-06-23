<template>
  <div class="index-page">
    <BannerCarousel class="carousel" />
    <AppHeading
      link-to="#"
      link-text="すべてを表示"
    >
      新着プラグイン
    </AppHeading>
    <AppPluginList />
    <AppSeparation />
    <AppHeading
      link-to="#"
      link-text="すべてを表示"
    >
      人気のプラグイン
    </AppHeading>
    <AppPluginList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppHeading from '@/components/ui/AppHeading.vue';
import AppPluginList from '@/components/ui/AppPluginList.vue';
import AppSeparation from '@/components/ui/AppSeparation.vue';
import BannerCarousel from '@/components/page/top/BannerCarousel.vue';

@Component({
  components: {
    AppHeading,
    AppPluginList,
    AppSeparation,
    BannerCarousel,
  },
})
export default class IndexPage extends Vue {
}
</script>

<style lang="sass" scoped>
.index-page
  & > .carousel
    margin-bottom: $layout-margin-md
</style>
