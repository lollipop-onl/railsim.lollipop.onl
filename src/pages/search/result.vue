<template>
  <div class="search-result-page">
    <div class="search-header">
      <div class="label">
        検索結果
      </div>
      <n-link
        to="#"
        class="word"
      >
        検索ワード
        <i class="icon ion-ios-options" />
      </n-link>
    </div>
    <div class="tags">
      <AppPluginTag category>
        車輌
      </AppPluginTag>
      <AppPluginTag>港湾</AppPluginTag>
      <AppPluginTag>ガントリークレーン</AppPluginTag>
    </div>
    <AppPluginList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppPluginList from '@/components/ui/AppPluginList.vue';
import AppPluginTag from '@/components/ui/AppPluginTag.vue';

@Component({
  components: {
    AppPluginList,
    AppPluginTag,
  },
  layoutProps(this: SearchResultPage) {
    return {
      breadcrumbs: [
        { title: 'プラグイン検索', to: '/' },
        { title: '検索結果' },
      ],
    };
  },
})
export default class SearchResultPage extends Vue {
}
</script>

<style lang="sass" scoped>
.search-result-page
  & > .tags
    margin-bottom: $layout-margin-lg - $layout-margin-xsm

.search-header
  &
    margin-bottom: $layout-margin-md

  & > .label
    margin-bottom: $layout-margin-xsm
    font-size: $font-sm
    color: rgba($_text, $_light-md)

  & > .word
    font-size: $font-xlg
    line-height: $font-xlg * 1.5
    color: $_text
    text-decoration: none
    vertical-align: middle

  & > .word > .icon
    display: none
    margin-left: $layout-margin-xsm
    font-size: $font-md
    color: rgba($_text, $_light-md)

  & > .word:hover
    text-decoration: underline

  & > .word:hover > .icon
    display: inline-block
</style>
