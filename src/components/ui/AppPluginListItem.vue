<template>
  <li>
    <n-link
      :to="`/plugin/${plugin.id}`"
      class="plugin-list-item"
    >
      <div class="eyecatch">
        <img
          :src="plugin.banner"
          class="image"
        >
      </div>
      <div class="title">
        {{ plugin.name }}
      </div>
      <div class="author">
        by {{ plugin.userId }}
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
        {{ plugin.updatedAt.toMillis() | dayjs }}
      </div>
    </n-link>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { dayjs } from '@/plugins/filters';
import { Plugin } from '@/models';

@Component({
  filters: {
    dayjs,
  },
})
export default class AppPluginListItem extends Vue {
  @Prop({ type: Object, required: true })
  plugin: Plugin['Value'];
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
    text-decoration: none

  & > .eyecatch
    position: relative
    grid-area: eyecatch
    margin-bottom: $layout-margin-xsm

  & > .eyecatch::before
    display: block
    padding-top: 56.25%
    content: ''

  &:hover > .eyecatch
    opacity: $_light-sm

  & > .eyecatch > .image
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    border-radius: $layout-radius-md

  & > .title
    +text-ellipsis
    grid-area: title
    margin-bottom: $layout-margin-xsm
    font-size: $font-md
    font-weight: bold
    color: $_text
    line-height: 1.5

  &:hover > .title
    text-decoration: underline

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
