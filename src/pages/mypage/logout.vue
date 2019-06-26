<template>
  <div class="logout-page">
    <img
      class="spinner"
      src="~assets/images/common/spinner-primary.svg"
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { RootStore } from '@/types/vuex';

@Component({
  beforeRouteLeave(this: LogoutPage, to, from, next) {
    if (this.isLoading) {
      next(false);
    } else {
      next();
    }
  },
})
export default class LogoutPage extends Vue {
  $store!: RootStore;

  /** ローディング状態 */
  isLoading = false;

  /** ライフサイクル */
  mounted(): void {
    this.logout();
  }

  /** ログアウトする */
  async logout(): Promise<void> {
    this.isLoading = true;

    try {
      await this.$store.dispatch('auth/logout');

      this.isLoading = false;
      this.$router.replace('/');
    } catch (err) {
      this.isLoading = false;
      this.$nuxt.error({ statusCode: 500 });
    }
  }
}
</script>

<style lang="sass" scoped>
.logout-page
  &
    padding-top: calc(var(--vh, 1vh) * 30)

  & > .spinner
    display: block
    margin: 0 auto
</style>
