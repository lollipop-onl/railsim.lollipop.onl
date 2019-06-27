<template>
  <div class="signup-page">
    <LoginFormCard
      class="card"
    >
      <div class="card-content">
        <h1 class="heading">
          <img
            src="~assets/images/text/signup.svg"
            alt="Sign-up"
          >
        </h1>
        <form @submit.prevent>
          <div class="signup-form">
            <AppInput
              v-model="email"
              class="input"
              placeholder="メールアドレス"
              icon="ios-person"
              :max-length="100"
            />
            <AppInput
              v-model="password"
              class="input"
              placeholder="パスワード"
              icon="ios-key"
              :max-length="50"
            />
            <AppInput
              v-model="userId"
              class="input"
              placeholder="ユーザーID"
              icon="ios-at"
              :max-length="20"
              help="ユーザーには半角英数字と_が利用できます。一度設定したら変更することはできません"
            />
            <button
              type="submit"
              class="submit"
            >
              ユーザー登録
            </button>
          </div>
        </form>
      </div>
      <template v-slot:side>
        <n-link
          class="login-link"
          to="/login"
        >
          <i class="icon ion-ios-arrow-back" />
          <img
            src="~assets/images/text/login-white.svg"
            alt="Back to login"
          >
        </n-link>
        <n-link
          class="terms-link"
          to="/"
        >
          利用規約
        </n-link>
      </template>
    </LoginFormCard>
    <n-link
      class="top-link"
      to="/"
    >
      トップページへもどる
    </n-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppInput from '@/components/ui/AppInput.vue';
import LoginFormCard from '@/components/page/login/LoginFormCard.vue';

@Component({
  components: {
    AppInput,
    LoginFormCard,
  },
  layout: 'minimal',
})
export default class SignUpPage extends Vue {
  /** メールアドレス */
  email = '';

  /** パスワード */
  password = '';

  /** ユーザーID */
  userId = '';
}
</script>

<style lang="sass" scoped>
.signup-page
  &
    padding-top: $layout-margin-xlg

.card-content
  & > .heading
    margin-bottom: $layout-margin-lg

.signup-form
  & > .input
    margin-bottom: $layout-margin-md

  & > .submit
    @extend .button-base
    @extend .button-base.-primary
    display: block
    width: 216px
    max-width: 100%
    margin: $layout-margin-lg auto 0

.login-link
  &
    position: absolute
    top: $layout-margin-md
    left: $layout-margin-sm
    display: flex
    align-items: center
    opacity: $_light-sm
    transition: opacity 0.12s ease

  &:hover
    opacity: 1

  & > .icon
    margin-right: $layout-margin-sm
    color: $_white
    font-size: 20px

.terms-link
  &
    display: table
    margin: auto auto $layout-margin-lg
    font-size: $font-sm
    font-weight: bold
    color: rgba($_secondary, $_light-md)

  &:hover
    text-decoration: none

.top-link
  &
    display: table
    margin: $layout-margin-xlg auto 0
    font-size: $font-sm
    color: $_text-link

  &:hover
    text-decoration: none
</style>
