<template>
  <div class="index-page">
    <TopBannerCarousel class="carousel" />
    <AppHeading
      link-to="#"
      link-text="すべてを表示"
    >
      新着プラグイン
    </AppHeading>
    <AppPluginList />
    <AppSeparation />
    <button @click="createUser">
      Create user.
    </button>
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
import TopBannerCarousel from '@/components/page/top/TopBannerCarousel.vue';
import { RootStore } from '~/types/vuex';

@Component({
  components: {
    AppHeading,
    AppPluginList,
    AppSeparation,
    TopBannerCarousel,
  },
})
export default class IndexPage extends Vue {
  $store!: RootStore;

  async createUser(): Promise<void> {
    await this.$store.dispatch('user/createUser', {
      id: 'simochee',
      data: {
        name: 'Ryoya Tamura',
        avatar: 'http://placehold.jp/320x320.png',
      },
    });
  }
}
</script>

<style lang="sass" scoped>
.index-page
  & > .carousel
    margin-bottom: $layout-margin-md
</style>
