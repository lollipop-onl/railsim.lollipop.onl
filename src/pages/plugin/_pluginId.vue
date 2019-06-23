<template>
  <div>
    <PluginBannerCarousel />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import PluginBannerCarousel from '@/components/page/plugin/PluginBannerCarousel.vue';

@Component({
  components: {
    PluginBannerCarousel,
  },
  layoutProps(this: PluginDetailPage) {
    return {
      breadcrumbs: [
        { title: '港湾シリーズ第１段ガントリークレーンとタグボート港湾シリーズ第１段ガントリークレーンとタグボート港湾' },
      ],
    };
  },
})
export default class PluginDetailPage extends Vue {
}
</script>

<style lang="sass" scoped>
</style>
