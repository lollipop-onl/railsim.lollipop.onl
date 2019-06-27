<template>
  <div class="app-input">
    <div class="app-input-field">
      <input
        v-validate:value="validate"
        v-bind="$attrs"
        :type="type"
        class="field"
        :class="{'-icon': icon, '-status': errorMessage}"
        :value="value"
        :name="name"
        v-on="listeners"
      >
      <i
        v-if="icon"
        class="icon"
        :class="`ion-${icon}`"
      />
      <i
        v-if="errorMessage"
        class="status -danger ion-ios-close-circle-outline"
      />
      <img
        v-else-if="loading"
        class="status -loading"
        src="~assets/images/common/spinner-primary.svg"
        alt="Loading"
      >
      <i
        v-else-if="success"
        class="status -success ion-ios-checkmark-circle-outline"
      />
    </div>
    <div class="addition">
      <p
        v-if="errorMessage"
        class="help -danger"
      >
        {{ errorMessage }}
      </p>
      <p
        v-else-if="help"
        class="help"
      >
        {{ help }}
      </p>
      <div
        v-if="maxLength > 0"
        class="counter"
        :class="{'-danger': value.length > maxLength}"
      >
        {{ value.length }} / {{ maxLength }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Emit, Inject, Model, Prop, Vue,
} from 'nuxt-property-decorator';
import { Validator } from 'vee-validate';

@Component
export default class AppInput extends Vue {
  /** VeeValidate */
  @Inject() readonly $validator: Validator;

  /** Input Type Attribute */
  @Prop({ type: String, default: 'text' })
  readonly type: string;

  /** Input Name Attribute */
  @Prop({ type: String, required: true })
  readonly name: string;

  /** アイコン */
  @Prop({ type: String })
  readonly icon?: string

  /** 最大入力文字数 */
  @Prop({ type: Number, default: 0 })
  readonly maxLength: number;

  /** ヘルプメッセージ */
  @Prop({ type: String })
  readonly help?: string;

  /** VeeValidate Rules */
  @Prop({ type: [String, Object], default: '' })
  public validate: string | Record<string, any>;

  /** エラーメッセージ */
  @Prop({ type: String })
  readonly error?: string;

  /** ローディングフラグ */
  @Prop({ type: Boolean, default: false })
  readonly loading: boolean;

  /** 成功フラグ */
  @Prop({ type: Boolean, default: false })
  readonly success: boolean;

  /** モデルを定義 */
  @Model('input', { type: String, required: true })
  readonly value: string;

  /** Wrapper of $listeners */
  get listeners() {
    return {
      ...this.$listeners,
      input: this.input,
    };
  }

  /** エラーメッセージ */
  get errorMessage(): string {
    if (this.error) {
      return this.error;
    }

    if (this.maxLength > 0 && this.value.length > this.maxLength) {
      return '入力文字数が長すぎます';
    }

    return '';
  }

  /** inputイベントをEmitする */
  @Emit() input(e: Event): string {
    if (!e.target) return '';

    if (!(e.target instanceof HTMLInputElement)) {
      return '';
    }

    const { value } = e.target;

    return value;
  }
}
</script>

<style lang="sass" scoped>
.app-input
  & > .addition
    display: flex
    width: 100%
    margin-top: $layout-margin-xsm

  & > .addition > .help
    margin-right: 1.5em
    font-size: $font-xsm
    line-height: 1.5

  & > .addition > .help.-danger
    color: $_danger

  & > .addition > .counter
    flex-shrink: 0
    margin-left: auto
    font-size: $font-xsm
    line-height: 1.5

  & > .addition > .counter.-danger
    color: $_danger

.app-input-field
  &
    position: relative
    height: 42px

  & > .field
    box-sizing: border-box
    width: 100%
    padding: 10px $layout-margin-sm
    font-size: $font-md
    line-height: 1.5
    background: $_secondary
    border: 1px solid rgba($_primary, $_light-lg)
    border-radius: $layout-radius-md

  & > .field.-icon
    padding-left: $layout-margin-lg

  & > .field::placeholder
    color: rgba($_primary, $_light-md)

  & > .icon
    position: absolute
    top: 50%
    left: 22px
    font-size: 20px
    color: rgba($_primary, $_light-md)
    transform: translate(-50%, -50%)

  & > .status
    position: absolute
    top: 50%
    left: calc(100% - 22px)
    font-size: 20px
    transform: translate(-50%, -50%)

  & > .status.-success
    color: $_success

  & > .status.-danger
    color: $_danger

  & > .status.-loading
    width: 20px
</style>
