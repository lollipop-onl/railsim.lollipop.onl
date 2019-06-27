<template>
  <div class="login-page">
    <LoginFormCard
      reverse
      class="card"
    >
      <div class="card-content">
        <h1 class="heading">
          <img
            src="~assets/images/text/login.svg"
            alt="Login"
          >
        </h1>
        <form @submit.prevent="onSubmit">
          <div class="login-form">
            <AppInput
              v-model="email"
              data-vv-as="メールアドレス"
              name="email"
              class="input"
              placeholder="メールアドレス"
              icon="ios-person"
              validate="required|email"
              :error="errors.first('email')"
            />
            <AppInput
              v-model="password"
              data-vv-as="パスワード"
              type="password"
              name="password"
              class="input"
              placeholder="パスワード"
              icon="ios-key"
              validate="required|min:6|max:50"
              :error="errors.first('password')"
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
      <template
        v-slot:side
      >
        <div
          class="side-content"
        >
          <p class="desc">
            アカウントをお持ちではないですか？
          </p>
          <n-link
            to="/signup"
            class="signup"
          >
            ユーザー登録
          </n-link>
        </div>
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
import { RootStore } from '@/types/vuex';

@Component({
  components: {
    AppInput,
    LoginFormCard,
  },
  layout: 'minimal',
  $_veeValidate: { // eslint-disable-line @typescript-eslint/camelcase
    validator: 'new',
  },
})
export default class LoginPage extends Vue {
  $store!: RootStore;

  /** メールアドレス */
  email = '';

  /** パスワード */
  password = '';

  /**
   * フォームが送信されたときの処理
   */
  async onSubmit(): Promise<void> {
    const isValid = await this.$validator.validateAll();

    if (!isValid) {
      return;
    }

    try {
      await this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      });

      this.$toast.success('ログインに成功しました');
      this.$router.replace('/');
    } catch (err) {
      console.log(err);
    }
  }
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

.side-content
  &
    margin-top: auto

  & > .desc
    font-size: $font-sm
    color: rgba($_white, $_light-md)
    text-align: center

  & > .signup
    @extend .button-base
    @extend .button-base.-outline-light
    display: block
    width: 216px
    max-width: 80%
    margin: $layout-margin-md auto $layout-margin-lg

.top-link
  &
    display: table
    margin: $layout-margin-xlg auto 0
    font-size: $font-sm
    color: $_text-link

  &:hover
    text-decoration: none
</style>
