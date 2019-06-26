<template>
  <div class="header-menu">
    <n-link
      class="link"
      to="/mypage"
      @click.native="navigate"
    >
      マイページ
    </n-link>
    <hr class="separation">
    <n-link
      class="link"
      to="/mypage/plugin/publish"
      @click.native="navigate"
    >
      プラグイン投稿
    </n-link>
    <n-link
      class="link"
      to="/mypage/plugin/private"
      @click.native="navigate"
    >
      非公開プラグイン
    </n-link>
    <hr class="separation">
    <n-link
      class="link"
      to="/mypage/setting"
      @click.native="navigate"
    >
      設定
    </n-link>
    <hr class="separation">
    <n-link
      class="link"
      to="/mypage/logout"
      @click.native="navigate"
    >
      ログアウト
    </n-link>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'nuxt-property-decorator';

@Component
export default class TheHeaderMenu extends Vue {
  /** クリック */
  @Emit() navigate() {}
}
</script>

<style lang="sass" scoped>
.header-menu
  &
    background: $_white
    border: 1px solid rgba($_secondary, $_light-sm)
    border-radius: $layout-radius-md
    box-shadow: 0 2px 8px -2px rgba($_text, $_light-lg)

  & > .separation
    margin: 0
    border: none
    border-bottom: 1px solid $_secondary

  & > .link
    display: block
    padding: 0 $layout-margin-sm
    font-size: $font-sm
    color: $_text
    line-height: 3
    text-decoration: none

  & > .link:hover
    background: rgba($_secondary, $_light-sm)
</style>
