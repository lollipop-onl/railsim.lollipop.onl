<template>
  <div>
    <AppHeading>プラグイン検索</AppHeading>
    <form>
      <AppForm>
        <AppFormRow title="キーワード">
          <AppFormInput
            block
            placeholder="検索キーワード"
          />
        </AppFormRow>
        <AppFormRow title="カテゴリ">
          <div class="search-tags">
            <AppPluginTag category>
              架線柱
            </AppPluginTag>
            <AppPluginTag category>
              架線
            </AppPluginTag>
            <AppPluginTag category>
              橋梁
            </AppPluginTag>
            <AppPluginTag category>
              橋桁
            </AppPluginTag>
            <AppPluginTag category>
              車輌
            </AppPluginTag>
            <AppPluginTag category>
              施設
            </AppPluginTag>
            <AppPluginTag category>
              駅舎
            </AppPluginTag>
            <AppPluginTag category>
              地形
            </AppPluginTag>
            <AppPluginTag category>
              環境
            </AppPluginTag>
            <AppPluginTag category>
              スキン
            </AppPluginTag>
          </div>
        </AppFormRow>
        <AppFormRow title="タグ">
          <div class="search-tags">
            <AppPluginTag>船舶</AppPluginTag>
            <AppPluginTag>港湾</AppPluginTag>
            <AppPluginTag>JR東海</AppPluginTag>
            <AppPluginTag>JR北海道</AppPluginTag>
            <AppPluginTag>EF65 PF</AppPluginTag>
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
