<template>
  <div
    :is="button ? 'button' : 'n-link'"
    :class="{ 'app-plugin-tag': true, '-category': category, '-inactive': inactive }"
    :type="button ? 'button' : null"
    :to="!button ? link : null"
    v-on="$listeners"
  >
    <template v-if="category">
      {{ category.name }}
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { stringifySearchQuery } from '@/utils';

@Component
export default class AppPluginTag extends Vue {
  /** カテゴリかどうか */
  @Prop({ type: String, default: '' }) categoryId: string;

  /** ボタンかどうか */
  @Prop({ type: Boolean, default: false }) button: boolean;

  /** 非活性かどうか */
  @Prop({ type: Boolean, default: false }) inactive: boolean;

  /** カテゴリ */
  get category() {
    return this.$C.PLUGIN_CATEGORY.find(({ id }) => id === this.categoryId);
  }

  /** リンク */
  get link() {
    const query = stringifySearchQuery({ category: [this.categoryId] });

    return `/search/result?${query}`;
  }
}
</script>

<style lang="sass" scoped>
.app-plugin-tag
  &
    +text-ellipsis
    box-sizing: border-box
    display: inline-block
    max-width: 18em
    min-width: 4em
    height: 20px
    padding: 0 $layout-margin-xsm
    margin-bottom: $layout-margin-xsm
    cursor: pointer
    font-size: $font-sm
    color: $_text
    line-height: 18px
    text-align: center
    text-decoration: none
    border: 1px solid #ccc
    border-radius: $layout-radius-sm
    transition: opacity 0.12s ease

  &:not(:last-child)
    margin-right: $layout-margin-xsm

  &.-category
    background: #dfdfdf
    border: none

  &.-category::before
    margin-right: $layout-margin-xsm / 2
    content: ''
    font-family: Ionicons

  &.-inactive
    opacity: $_light-md

  &:not(.-inactive):hover
    opacity: $_light-sm
</style>
