<template>
  <div>
    <AppHeading>プラグイン検索</AppHeading>
    <form @submit.prevent="onSubmit">
      <AppForm>
        <AppFormRow title="キーワード">
          <AppFormInput
            v-model="keyword"
            block
            placeholder="検索キーワード"
          />
        </AppFormRow>
        <AppFormRow
          title="カテゴリ"
          wrapper="div"
        >
          <div class="search-tags">
            <template v-for="({ id }) in $C.PLUGIN_CATEGORY">
              <AppPluginTag
                :key="id"
                :category-id="id"
                :inactive="!selectedCategory.includes(id)"
                button
                @click="toggleCategory(id)"
              />
            </template>
          </div>
        </AppFormRow>
        <AppFormRow
          title="タグ"
          wrapper="div"
        >
          <div class="search-tags">
            <AppPluginTag
              button
              inactive
            >
              船舶
            </AppPluginTag>
            <AppPluginTag
              button
            >
              港湾
            </AppPluginTag>
            <AppPluginTag
              button
              inactive
            >
              JR東海
            </AppPluginTag>
            <AppPluginTag
              button
              inactive
            >
              JR北海道
            </AppPluginTag>
            <AppPluginTag
              button
              inactive
            >
              EF65 PF
            </AppPluginTag>
          </div>
        </AppFormRow>
        <button
          type="submit"
          class="submit-button"
        >
          プラグイン検索
        </button>
      </AppForm>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppHeading from '@/components/ui/AppHeading.vue';
import AppPluginTag from '@/components/ui/AppPluginTag.vue';
import AppForm from '@/components/ui/AppForm.vue';
import AppFormRow from '@/components/ui/AppFormRow.vue';
import AppFormInput from '@/components/ui/AppFormInput.vue';
import { arrayify, parseSearchQuery, stringifySearchQuery } from '@/utils';

@Component({
  components: {
    AppHeading,
    AppPluginTag,
    AppForm,
    AppFormRow,
    AppFormInput,
  },
  layoutProps(this: SearchPage) {
    return {
      breadcrumbs: [
        { title: 'プラグイン検索' },
      ],
    };
  },
})
export default class SearchPage extends Vue {
  /** 検索キーワード */
  keyword = '';

  /** カテゴリ */
  selectedCategory: string[] = [];

  /** Lifecycle */
  mounted(): void {
    const { keyword, category } = parseSearchQuery(this.$route.query);

    this.keyword = arrayify(keyword)[0] || '';
    this.selectedCategory = category;
  }

  /**
   * カテゴリの選択状態をトグルする
   */
  toggleCategory(categoryId: string): void {
    const index = this.selectedCategory.indexOf(categoryId);

    if (index >= 0) {
      this.selectedCategory.splice(index, 1);
    } else {
      this.selectedCategory.push(categoryId);
    }
  }

  /**
   * 検索を実行する
   */
  onSubmit(): void {
    const query = stringifySearchQuery({
      keyword: this.keyword,
      category: this.selectedCategory,
    });

    this.$router.push(`/search/result?${query}`);
  }
}
</script>

<style lang="sass" scoped>
.search-tags
  &
    padding-top: 12px
    margin-bottom: -$layout-margin-xsm

.submit-button
  &
    @extend .button-base
    @extend .button-base.-outline
    @extend .button-base.-block
    width: 216px
    max-width: 100%
    margin: $layout-margin-lg auto 0
</style>
