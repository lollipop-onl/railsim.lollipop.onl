<template>
  <input
    v-bind="$attrs"
    :type="type"
    :class="{ 'form-input': true, '-block': block }"
  >
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class AppFormInput extends Vue {
  /** Input Type */
  @Prop({ type: String, default: 'text' }) type: string;

  /** ブロックスタイルにするか */
  @Prop({ type: Boolean, default: false }) block: boolean;
}
</script>

<style lang="sass" scoped>
.form-input
  &
    box-sizing: border-box
    height: 42px
    padding: 0 1.5em
    background: $_secondary
    border: 1px solid rgba(#1f3b4e, 0.2)
    border-radius: $layout-radius-md

  &.-block
    display: block
    width: 100%
</style>
