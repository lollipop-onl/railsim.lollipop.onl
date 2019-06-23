<template>
  <form @submit.prevent="submit">
    <div class="sidebar-search">
      <input
        type="text"
        class="field"
        :value="value"
        v-bind="$attrs"
        v-on="listeners"
      >
      <i class="icon ion-ios-search" />
      <button
        class="submit"
        type="submit"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import {
  Component, Emit, Model, Vue,
} from 'nuxt-property-decorator';

@Component
export default class TheSidebarSearch extends Vue {
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

  /** 入力が送信されたことを通知 */
  @Emit() submit() { return this.value; }
}
</script>

<style lang="sass" scoped>
.sidebar-search
  &
    position: relative
    height: 42px
    overflow: hidden

  & > .field
    box-sizing: border-box
    width: 100%
    height: 42px
    padding: 0 $layout-margin-sm 0 35px
    background: $_white
    border-radius: $layout-radius-md
    transition: padding 0.12s ease

  & > .icon
    position: absolute
    top: 50%
    right: 100%
    width: 20px
    font-size: 20px
    text-align: center
    transform: translate3d(28px, -50%, 0)
    transition: transform 0.12s ease, opacity 0.12s ease

  & > .field:not(:placeholder-shown),
  & > .field:focus
    padding-left: $layout-margin-sm

  & > .field:not(:placeholder-shown) + .icon,
  & > .field:focus + .icon
    opacity: 0
    transform: translate3d(12px, -50%, 0)

  & > .submit
    display: none
</style>
