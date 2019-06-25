<template>
  <div class="error-page">
    <img
      v-if="error.statusCode === 403"
      class="notfound"
      src="~assets/images/error/403.svg"
      alt="Forbidden"
    >
    <img
      v-if="error.statusCode === 404"
      class="notfound"
      src="~assets/images/error/404.svg"
      alt="Page Not Found"
    >
    <img
      v-if="error.statusCode === 500"
      class="notfound"
      src="~assets/images/error/500.svg"
      alt="Internal Server Error"
    >
    <img
      v-if="error.statusCode === 503"
      class="notfound"
      src="~assets/images/error/503.svg"
      alt="Service Unavailable"
    >
    <div class="footer">
      <n-link
        class="link"
        to="/"
      >
        トップページへ戻る
      </n-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class ErrorLayout extends Vue {
  @Prop({ type: Object }) error: object;
}
</script>

<style lang="sass" scoped>
.error-page
  & > .footer
    margin-top: calc(var(--vh, 1vh) * 20)
    text-align: center

  & > .footer > .link
    color: $_primary
    font-size: $font-md
    text-decoration: underline

  & > .footer > .link:hover
    text-decoration: none

  & > .notfound
    display: block
    width: 280px
    max-width: 70%
    margin: calc(var(--vh, 1vh) * 25) auto 0
</style>
