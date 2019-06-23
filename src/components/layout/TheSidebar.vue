<template>
  <div class="the-sidebar">
    <div class="container">
      <TheSidebarSearch
        v-model="searchWord"
        placeholder="ストアを検索"
      />
    </div>
    <TheSidebarCategoryList />
    <hr class="separation">
    <div class="container">
      <n-link
        to="#"
        class="button-base -block -outline"
      >
        ログイン
      </n-link>
      <p class="help">
        ログインするとお気に入りや拍手など限定機能を利用できます。
      </p>
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

@Component({
  components: {
    TheSidebarSearch,
    TheSidebarCategoryList,
    TheSidebarNav,
  },
})
export default class TheSidebar extends Vue {
  /** 検索ワード */
  searchWord = '';
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

  & > .container > .help
    margin-top: $layout-margin-xsm
    font-size: $font-xsm
    color: rgba($_primary, $_light-md)
    line-height: 1.5

  & > .separation
    margin: $layout-margin-md $layout-margin-sm
    border: none
    border-bottom: 1px solid rgba($_primary, $_light-lg)
</style>
