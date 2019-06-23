<template>
  <footer class="the-footer">
    <div class="container">
      <img
        class="logo"
        src="~assets/images/common/logo-lg.svg"
        alt="RailSimPlugnStore"
      >
      <ul class="footer-nav">
        <li class="item">
          <n-link
            class="link"
            to="#"
          >
            サイトマップ
          </n-link>
        </li>
        <li class="item">
          <n-link
            class="link"
            to="#"
          >
            ヘルプ
          </n-link>
        </li>
        <li class="item">
          <n-link
            class="link"
            to="#"
          >
            利用規約
          </n-link>
        </li>
        <li class="item">
          <n-link
            class="link"
            to="#"
          >
            Twitterアカウント
          </n-link>
        </li>
      </ul>
    </div>
    <div class="copyright">
      <img
        class="image"
        src="~assets/images/common/copyright.svg"
        alt="(c) 2019 lollipop.onl"
      >
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheFooter extends Vue {


}
</script>

<style lang="sass" scoped>
.the-footer
  &
    background: $_secondary

  & > .container
    +container
    display: flex
    align-items: flex-start
    padding-top: $layout-margin-lg
    padding-bottom: $layout-margin-xlg

  & > .container > .logo
    margin-right: auto

  & > .copyright
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 36px
    text-align: center
    background: $_primary

.footer-nav
  &
    margin-right: $layout-margin-lg

  & > .item
    margin-bottom: 14px

  & > .item > .link
    font-size: $font-sm
    color: $_primary
    line-height: 1.5
    text-decoration: none

  & > .item > .link:hover
    text-decoration: underline
</style>
