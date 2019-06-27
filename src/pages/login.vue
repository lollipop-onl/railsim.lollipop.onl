<template>
  <div class="login-page">
    <LoginFormCard class="card">
      <div class="card-content">
        <h1 class="heading">
          <img
            src="~assets/images/text/login.svg"
            alt="Login"
          >
        </h1>
        <form @submit.prevent>
          <div class="login-form">
            <AppInput
              v-model="email"
              class="input"
              placeholder="メールアドレス"
              icon="ios-person"
            />
            <AppInput
              v-model="password"
              class="input"
              placeholder="パスワード"
              icon="ios-key"
            />
            <button
              type="submit"
              class="submit"
            >
              ログイン
            </button>
          </div>
        </form>
        <n-link
          class="forget-password"
          to="/"
        >
          パスワードをお忘れの方
        </n-link>
      </div>
    </LoginFormCard>
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
export default class LoginPage extends Vue {
  /** メールアドレス */
  email = '';

  /** パスワード */
  password = '';
}
</script>

<style lang="sass" scoped>
.login-page
  &
    padding-top: $layout-margin-xlg

.card-content
  & > .heading
    margin-bottom: $layout-margin-lg

.login-form
  & > .input
    margin-bottom: $layout-margin-md

  & > .submit
    @extend .button-base
    @extend .button-base.-primary
    display: block
    width: 216px
    max-width: 100%
    margin: $layout-margin-lg auto 0

.forget-password
  &
    display: table
    margin: $layout-margin-lg auto 0
    font-size: $font-sm
    color: rgba($_primary, $_light-md)

  &:hover
    text-decoration: none
</style>
