<template>
  <div v-if="plugin">
    <p>Link: {{ plugin.downloadUrl }}</p>
    <a
      :href="plugin.downloadUrl"
      target="_blank"
      rel="noopener"
    >
      ダウンロードページへアクセス
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { RootStore } from '@/types/vuex';

@Component({
  layoutProps(this: PluginDetailPage) {
    return {
      breadcrumbs: [
        { title: this.user.name, to: this.user.link, loading: this.isLoading },
        { title: this.plugin.name, to: this.plugin.link, loading: this.isLoading },
        { title: 'ダウンロード' },
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
    const { [pluginId]: plugin } = this.$store.state.plugin.pluginData;

    if (!plugin) {
      return { name: '', link: '', userId: '' };
    }

    return {
      ...plugin,
      link: `/plugin/${plugin.id}`,
    };
  }

  /** 投稿者のユーザープロフィール */
  get user() {
    const { userId } = this.plugin;
    const { [userId]: user } = this.$store.state.user.userData;

    if (!user) {
      return { name: '', link: '' };
    }

    return {
      ...user,
      link: `/author/${user.id}`,
    };
  }

  async mounted(): Promise<void> {
    const { pluginId } = this.$route.params;

    this.isLoading = true;

    try {
      await this.$store.dispatch('plugin/fetchPlugin', pluginId);
      await this.$store.dispatch('user/fetchUserProfile', this.plugin.userId);
    } catch (err) {
      // Do nothing
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

  & > .introduction
    max-width: 640px
    margin-right: $layout-margin-sm

  & > .information
    flex-grow: 1
    width: 320px

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
