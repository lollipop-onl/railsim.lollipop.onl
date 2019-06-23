<template>
  <div class="search-result-page">
    <div
      v-if="category"
      class="search-header"
    >
      <div class="label">
        カテゴリ
      </div>
      <n-link
        :to="`/search?${query}`"
        class="word"
      >
        {{ category.name || 'すべてのプラグイン' }}
        <i class="icon ion-ios-options" />
      </n-link>
    </div>
    <AppPluginList />
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/vue-app';
import { Component, Vue } from 'nuxt-property-decorator';
import AppPluginList from '@/components/ui/AppPluginList.vue';
import AppPluginTag from '@/components/ui/AppPluginTag.vue';
import * as C from '@/constants';
import { stringifySearchQuery } from '@/utils';

@Component({
  components: {
    AppPluginList,
    AppPluginTag,
  },
  watchQuery: true,
  layoutProps(this: CategoryPage) {
    return {
      breadcrumbs: [
        { title: `カテゴリ：${this.category ? this.category.name : ''}` },
      ],
    };
  },
})
export default class CategoryPage extends Vue {
  /** クエリ */
  get query() {
    const { categoryId } = this.$route.params;

    return stringifySearchQuery({ category: [categoryId] });
  }

  /** カテゴリ */
  get category() {
    const { categoryId } = this.$route.params;

    return this.$C.PLUGIN_CATEGORY.find(({ id }) => categoryId === id);
  }

  /** Lifecycle */
  validate({ route }: Context): boolean {
    const { categoryId } = route.params;

    return C.PLUGIN_CATEGORY.some(({ id }) => categoryId === id);
  }
}
</script>

<style lang="sass" scoped>
.search-result-page
  & > .tags
    margin-bottom: $layout-margin-lg - $layout-margin-xsm

.search-header
  &
    margin-bottom: $layout-margin-md

  & > .label
    margin-bottom: $layout-margin-xsm
    font-size: $font-sm
    color: rgba($_text, $_light-md)

  & > .word
    font-size: $font-xlg
    line-height: $font-xlg * 1.5
    color: $_text
    line-height: 1.5
    text-decoration: none
    vertical-align: middle

  & > .word > .icon
    display: none
    margin-left: $layout-margin-xsm
    font-size: $font-md
    color: rgba($_text, $_light-md)

  & > .word:hover
    text-decoration: underline

  & > .word:hover > .icon
    display: inline-block
</style>
