<template>
  <div class="the-sidebar">
    <div class="container">
      <TheSidebarSearch
        v-model="searchWord"
        placeholder="ストアを検索"
      />
    </div>
    <p>sidebar</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheSidebarSearch from '@/components/layout/TheSidebarSearch.vue';

@Component({
  components: {
    TheSidebarSearch,
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
    margin: 0 $layout-margin-sm
</style>
