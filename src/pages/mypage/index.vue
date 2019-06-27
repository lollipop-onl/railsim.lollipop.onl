<template>
  <div class="mypage-page">
    <p>Welcome you!</p>
    <div>
      <n-link to="/mypage/profile">
        プロフィール変更
      </n-link>
    </div>
    <div>
      <n-link to="/mypage/logout">
        ログアウト
      </n-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layoutProps() {
    return {
      breadcrumbs: [
        { title: 'マイページ' },
      ],
    };
  },
})
export default class MypagePage extends Vue {
}
</script>

<style lang="sass" scoped>
</style>
