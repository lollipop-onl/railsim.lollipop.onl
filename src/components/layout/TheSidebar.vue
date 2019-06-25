<template>
  <div class="the-sidebar">
    <div class="container">
      <TheSidebarSearch
        v-model="searchWord"
        placeholder="ストアを検索"
        @submit="searchKeyword"
      />
    </div>
    <TheSidebarCategoryList />
    <div class="container">
      <n-link
        class="detail-search"
        to="/search"
      >
        <i class="icon ion-ios-add" />
        詳細検索
      </n-link>
    </div>
    <hr class="separation">
    <div class="container">
      <template v-if="isInitialized">
        <n-link
          to="#"
          class="button-base -block -outline"
        >
          ログイン
        </n-link>
        <p class="help">
          ログインするとお気に入りや拍手など限定機能を利用できます。
        </p>
      </template>
      <template v-else>
        <img
          class="spinner"
          src="~assets/images/common/spinner-primary.svg"
        >
      </template>
    </div>
    <hr class="separation">
    <div class="container">
      <TheSidebarNav />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheSidebarSearch from '@/components/layout/TheSidebarSearch.vue';
import TheSidebarCategoryList from '@/components/layout/TheSidebarCategoryList.vue';
import TheSidebarNav from '@/components/layout/TheSidebarNav.vue';
import { RootStore } from '@/types/vuex';

@Component({
  components: {
    TheSidebarSearch,
    TheSidebarCategoryList,
    TheSidebarNav,
  },
})
export default class TheSidebar extends Vue {
  $store!: RootStore;

  /** 検索ワード */
  searchWord = '';

  /** 初期化中かどうか */
  get isInitialized() {
    return this.$store.state.auth.initialized;
  }

  /**
   * キーワード検索を実行する
   */
  searchKeyword(keyword: string): void {
    if (!keyword) return;

    this.$router.push(`/search/result?keyword=${keyword}`);
  }
}
</script>

<style lang="sass" scoped>
.the-sidebar
  &
    width: 240px
    padding: $layout-margin-md 0
    background: $_secondary
    border-bottom-right-radius: $layout-radius-md
    border-bottom-left-radius: $layout-radius-md

  & > .container
    margin: 0 $layout-margin-sm $layout-margin-md

  & > .container:last-child
    margin-bottom: 0

  & > .container > .spinner
    display: block
    width: 32px
    margin: $layout-margin-xlg auto

  & > .container > .help
    margin-top: $layout-margin-xsm
    font-size: $font-xsm
    color: rgba($_primary, $_light-md)
    line-height: 1.5

  & > .separation
    margin: $layout-margin-md $layout-margin-sm
    border: none
    border-bottom: 1px solid rgba($_primary, $_light-lg)

.detail-search
  &
    display: flex
    align-items: center
    margin: $layout-margin-xsm * 1.5 0 $layout-margin-sm
    font-size: $font-md
    color: rgba($_primary, $_light-sm)
    text-decoration: none

  &:hover
    text-decoration: underline

  & > .icon
    margin-right: $layout-margin-sm
    font-size: 20px
</style>
