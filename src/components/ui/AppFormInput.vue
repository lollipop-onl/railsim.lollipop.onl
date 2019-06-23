<template>
  <input
    v-bind="$attrs"
    :type="type"
    :class="{ 'form-input': true, '-block': block }"
    :value="value"
    v-on="listeners"
  >
</template>

<script lang="ts">
import {
  Component, Model, Prop, Vue,
} from 'nuxt-property-decorator';

@Component
export default class AppFormInput extends Vue {
  /** Input Type */
  @Prop({ type: String, default: 'text' }) type: string;

  /** ブロックスタイルにするか */
  @Prop({ type: Boolean, default: false }) block: boolean;

  /** 入力値 */
  @Model('input', { type: String, required: true })
  value: string;

  /** Event Listeners */
  get listeners() {
    return {
      ...this.$listeners,
      input: (e: Event) => {
        if (!(e.target instanceof HTMLInputElement)) return;

        this.$emit('input', e.target.value);
      },
    };
  }
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
