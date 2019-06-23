<template>
  <li class="plugin-list-item">
    <div class="eyecatch">
      <img
        src="~assets/images/dev/banner.png"
        class="image"
      >
    </div>
    <div class="title">
      プラグイン名プラグイン名プラグイン名プラグイン名
    </div>
    <div class="author">
      by しもさんしぃ
    </div>
    <div class="likes">
      <i class="icon ion-ios-thumbs-up" />
      5
    </div>
    <div class="downloads">
      <i class="icon ion-ios-download" />
      1,025
    </div>
    <div class="datetime">
      1 分以内
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AppPluginListItem extends Vue {
}
</script>

<style lang="sass" scoped>
.plugin-list-item
  &
    display: grid
    grid-template-areas: "eyecatch eyecatch eyecatch eyecatch" "title title title title" "author author author author" "likes downloads . datetime"
    grid-template-columns: auto auto 1fr auto
    grid-template-rows: auto auto auto auto
    color: rgba($_text, $_light-md)

  & > .eyecatch
    position: relative
    grid-area: eyecatch
    margin-bottom: $layout-margin-xsm

  & > .eyecatch::before
    display: block
    padding-top: 56.25%
    content: ''

  & > .eyecatch > .image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover

  & > .title
    +text-ellipsis
    grid-area: title
    margin-bottom: $layout-margin-xsm
    font-size: $font-md
    font-weight: bold
    color: $_text
    line-height: 1.5

  & > .author
    grid-area: author
    margin-bottom: $layout-margin-xsm
    font-size: $font-sm

  & > .likes
    grid-area: likes

  & > .downloads
    grid-area: downloads

  & > .likes,
  & > .downloads
    display: flex
    align-items: center
    margin-right: $layout-margin-xsm
    font-size: $font-sm

  & > .likes > .icon,
  & > .downloads > .icon
    margin-right: $layout-margin-xsm / 2

  & > .datetime
    grid-area: datetime
    font-size: $font-sm
</style>
