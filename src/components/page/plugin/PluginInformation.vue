<template>
  <div class="plugin-information">
    <div class="heading">
      作者
    </div>
    <n-link
      class="plugin-author"
      to="/author/dummy"
    >
      <div class="avatar">
        <img
          class="image"
          src="~assets/images/dev/avatar.png"
        >
      </div>
      <div class="username">
        しもさんしぃ
      </div>
      <div class="id">
        @simochee
      </div>
    </n-link>
    <hr class="separation">
    <div class="heading">
      登録タグ
    </div>
    <hr class="separation">
    <div class="heading">
      関連プラグイン
    </div>
    <hr class="separation">
    <dl class="plugin-history">
      <dt class="label">
        初回公開日時
      </dt>
      <dd class="value">
        2019/06/28 12:00
      </dd>
      <dt class="label">
        更新日時
      </dt>
      <dd class="value">
        2019/07/18 19:10
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class PluginInformation extends Vue {
}
</script>

<style lang="sass" scoped>
.plugin-information
  &
    padding: $layout-margin-md $layout-margin-xsm * 1.5
    background: $_secondary
    border-radius: $layout-radius-md

  & > .heading
    margin-bottom: $layout-margin-sm
    font-size: $font-sm
    color: rgba($_text, $_light-md)

  & > .separation
    margin: $layout-margin-md 0
    border: none
    border-bottom: 1px solid rgba($_primary, $_light-lg)

.plugin-author
  &
    display: grid
    grid-template-areas: "avatar username" "avatar id"
    grid-template-columns: auto 1fr
    color: $_text
    text-decoration: none

  & > .avatar
    grid-area: avatar
    margin-right: $layout-margin-xsm

  & > .avatar > .image
    width: 42px
    height: 42px
    border-radius: $layout-radius-md

  & > .username
    grid-area: username
    margin: $layout-margin-xsm / 2 0
    font-size: $font-md
    text-decoration: underline

  & > .id
    grid-area: id
    font-size: $font-sm
    color: rgba($_text, $_light-md)

  &:hover > .username
    text-decoration: none

.plugin-history
  &
    overflow: hidden
    margin-bottom: -$layout-margin-sm

  & > .label,
  & > .value
    margin-bottom: $layout-margin-sm
    line-height: $font-md

  & > .label
    float: left
    clear: both
    font-size: $font-xsm
    color: rgba($_text, $_light-lg)

  & > .value
    float: right
    font-size: $font-sm
    color: rgba($_text, $_light-md)
</style>
