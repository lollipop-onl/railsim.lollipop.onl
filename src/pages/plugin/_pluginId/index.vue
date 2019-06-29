<template>
  <div v-if="plugin">
    <div class="plugin-carousel">
      <PluginBannerCarousel />
    </div>
    <div class="plugin-details">
      <!-- eslint-disable -->
      <PluginIntroduction
        class="introduction"
        :title="plugin.name"
      >{{ plugin.description }}</PluginIntroduction>
      <!-- eslint-enable -->
      <div class="information">
        <div class="plugin-download">
          <n-link
            class="button"
            :to="downloadUrl"
          >
            <i class="icon ion-ios-cloud-download" />
            <img
              src="~assets/images/download.svg"
              alt="Download"
            >
          </n-link>
          <p class="help">
            ※ 公開者の指定した外部サイトを開きます
          </p>
        </div>
        <PluginInformation
          :plugin="plugin"
          :profile="userProfile"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import PluginBannerCarousel from '@/components/page/plugin/PluginBannerCarousel.vue';
import PluginIntroduction from '@/components/page/plugin/PluginIntroduction.vue';
import PluginInformation from '@/components/page/plugin/PluginInformation.vue';
import { RootStore } from '@/types/vuex';

@Component({
  components: {
    PluginBannerCarousel,
    PluginIntroduction,
    PluginInformation,
  },
  layoutProps(this: PluginDetailPage) {
    return {
      breadcrumbs: [
        { title: this.userProfile && this.userProfile.name, to: `/author/${this.userProfile && this.userProfile.id}`, loading: this.isLoading },
        { title: this.plugin && this.plugin.name, loading: this.isLoading },
      ],
    };
  },
})
export default class PluginDetailPage extends Vue {
  $store!: RootStore;

  /** ローディング状態 */
  isLoading = false;

  /** プラグインデータ */
  get plugin() {
    const { pluginId } = this.$route.params;

    return this.$store.state.plugin.pluginData[pluginId];
  }

  /** 投稿者のユーザープロフィール */
  get userProfile(): any | void {
    if (!this.plugin) {
      return undefined;
    }

    const { userId } = this.plugin;
    const { userData } = this.$store.state.user;

    return userData[userId];
  }

  /** ダウンロードページのリンク */
  get downloadUrl(): string {
    return `${this.$route.path}/download`;
  }

  async mounted(): Promise<void> {
    const { pluginId } = this.$route.params;

    this.isLoading = true;

    try {
      await this.$store.dispatch('plugin/fetchPlugin', pluginId);

      const { userId } = this.plugin;

      await this.$store.dispatch('user/fetchUserProfile', userId);
    } catch (err) {
      this.$nuxt.error({ statusCode: 404 });
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style lang="sass" scoped>
.plugin-carousel
  &
    margin-bottom: $layout-margin-lg

.plugin-details
  &
    display: flex
    justify-content: space-between

  & > .introduction
    max-width: 640px
    margin-right: $layout-margin-sm

  & > .information
    flex-grow: 1
    max-width: 320px
    min-width: 240px

.plugin-download
  &
    margin-bottom: $layout-margin-md

  & > .button
    @extend .button-base
    @extend .button-base.-primary
    @extend .button-base.-block
    position: relative
    box-sizing: border-box
    display: flex
    align-items: center
    justify-content: center
    height: 64px
    padding-left: $layout-margin-sm

  & > .button > .icon
    position: absolute
    top: 50%
    left: $layout-margin-sm
    font-size: 24px
    transform: translateY(-50%)

  & > .help
    margin-top: $layout-margin-xsm
    font-size: $font-xsm
    color: rgba($_text, $_light-md)
    text-align: center
</style>
