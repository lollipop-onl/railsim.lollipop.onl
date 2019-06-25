<template>
  <div v-if="plugin">
    <p>Link: {{ plugin.downloadUrl }}</p>
    <a
      :href="plugin.downloadUrl"
      target="_blank"
      rel="noopener"
    >
      ダウンロード
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
        { title: 'しもさんしぃ', to: '/author/simochee' },
        { title: this.plugin && this.plugin.name, to: this.plugin && `/plugin/${this.plugin.id}` },
        { title: 'ダウンロード' },
      ],
    };
  },
})
export default class PluginDetailPage extends Vue {
  $store!: RootStore;

  /** プラグインデータ */
  get plugin() {
    const { pluginId } = this.$route.params;

    return this.$store.state.plugin.pluginData[pluginId];
  }

  async mounted(): Promise<void> {
    const { pluginId } = this.$route.params;

    try {
      await this.$store.dispatch('plugin/fetchPlugin', pluginId);
    } catch (err) {
      // Do nothing
      this.$nuxt.error({ statusCode: 404 });
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
