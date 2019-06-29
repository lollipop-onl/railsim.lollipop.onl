<template>
  <form @submit.prevent="submit">
    <AppForm>
      <AppFormRow title="プラグイン名">
        <AppInput
          v-model="localValue.name"
          name="name"
          data-vv-as="プラグイン名"
          :max-length="50"
          validate="required|max:50"
          :error="errors.first('name')"
        />
      </AppFormRow>
      <AppFormRow title="説明文">
        <AppInput
          v-model="localValue.description"
          multiline
          name="description"
          data-vv-as="説明文"
          :max-length="1000"
          validate="required|max:1000"
          :error="errors.first('description')"
        />
      </AppFormRow>
      <AppFormRow title="画像">
        <AppImageInput
          v-model="localValue.banner"
        />
      </AppFormRow>
      <AppFormRow title="ダウンロードURL">
        <AppInput
          v-model="localValue.downloadUrl"
          name="downloadUrl"
          data-vv-as="ダウンロードURL"
          :max-length="120"
          validate="required|max:120"
          :error="errors.first('downloadUrl')"
        />
      </AppFormRow>
      <AppFormRow
        title="投稿カテゴリ"
        wrapper="div"
      >
        <div class="plugin-tags">
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
      <button
        type="submit"
        class="submit-button"
      >
        投稿
      </button>
    </AppForm>
  </form>
</template>

<script lang="ts">
import {
  Component, Emit, Inject, Model, Vue,
} from 'nuxt-property-decorator';
import { Validator } from 'vee-validate';
import AppForm from '@/components/ui/AppForm.vue';
import AppFormRow from '@/components/ui/AppFormRow.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppImageInput from '@/components/ui/AppImageInput.vue';
import AppPluginTag from '@/components/ui/AppPluginTag.vue';
import { Plugin } from '@/models';

@Component({
  components: {
    AppForm,
    AppFormRow,
    AppInput,
    AppImageInput,
    AppPluginTag,
  },
})
export default class MypagePage extends Vue {
  /** VeeValidate */
  @Inject() readonly $validator: Validator;

  /** モデルを定義 */
  @Model('input', { type: Object, required: true })
  readonly value: Plugin['Value'];

  get localValue() {
    return this.value;
  }

  set localValue(plugin: Plugin['Value']) {
    this.$emit('input', plugin);
  }

  /**
   * カテゴリの選択状態
   */
  get selectedCategory(): string [] {
    if (!this.value.category) {
      return [];
    }

    return this.value.category;
  }

  /** 送信のイベントを通知する */
  @Emit() submit() { return this.localValue; }

  /**
   * カテゴリの選択状態をトグルする
   */
  toggleCategory(categoryId: string): void {
    const { selectedCategory } = this;
    const index = selectedCategory.indexOf(categoryId);
    const category = [...selectedCategory];

    if (index >= 0) {
      category.splice(index, 1);
    } else {
      category.push(categoryId);
    }

    this.localValue = {
      ...this.localValue,
      category,
    };
  }
}
</script>

<style lang="sass" scoped>
.plugin-tags
  &
    padding-top: 12px
    margin-bottom: -$layout-margin-xsm


.submit-button
  &
    @extend .button-base
    @extend .button-base.-primary
    @extend .button-base.-block
    width: 216px
    max-width: 100%
    margin: $layout-margin-lg auto 0
</style>
