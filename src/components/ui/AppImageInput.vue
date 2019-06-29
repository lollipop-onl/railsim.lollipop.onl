<template>
  <div class="app-file-input">
    <label class="dummy-field">
      <input
        type="file"
        class="field"
        v-bind="$attrs"
        v-on="listeners"
      >
      <div
        v-if="previewData || initialSrc"
        class="preview"
      >
        <img
          :src="previewData || initialSrc"
          class="image"
        >
      </div>
      <div
        v-else
        class="empty"
      >
        <i class="icon ion-md-images" />
      </div>
    </label>
    <div class="addition">
      <p
        v-if="errorMessage"
        class="help -danger"
      >
        {{ errorMessage }}
      </p>
      <div
        class="counter"
        :class="{'-danger': isExceedLimit}"
      >
        {{ (file ? file.size : 0) | bytes }}
        /
        {{ limit | bytes }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { bind } from 'helpful-decorators';
import {
  Component, Emit, Model, Prop, Vue,
} from 'nuxt-property-decorator';

@Component
export default class AppImageInput extends Vue {
  /** ファイルオブジェクト */
  file: File | null = null;

  /** プレビューデータ */
  previewData = '';

  /** 許可するファイルタイプ */
  @Prop({ type: Array, default: () => ['image/png', 'image/jpeg'] })
  accepts: string[];

  /** 最大のファイルサイズ */
  @Prop({ type: Number, default: 1_000_000 })
  limit: number;

  /** 初期状態での画像ソース */
  @Prop({ type: String })
  initialSrc?: string;

  /** モデルを定義 */
  @Model('update', { type: File })
  readonly value?: File;

  /** inputイベントを発行する */
  @Emit() update(value = this.file) { return value; }

  /** Wrapper of $listeners */
  get listeners() {
    return {
      ...this.$listeners,
      change: this.onChangeValue,
    };
  }

  /** ファイルサイズが上限を超えていないか */
  get isExceedLimit(): boolean {
    return this.file ? this.file.size > this.limit : false;
  }

  /** エラーメッセージ */
  get errorMessage(): string {
    if (this.isExceedLimit) {
      return 'ファイルサイズが大きすぎます';
    }

    return '';
  }

  /**
   * フィールドの値が変わったらデータを取り出す
   */
  @bind
  async onChangeValue(e: Event): Promise<void> {
    const { target } = e;

    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const { files } = target;

    if (!files) {
      return;
    }

    const file = files[0];

    if (!file) {
      return;
    }

    if (!this.accepts.includes(file.type)) {
      return;
    }

    try {
      this.previewData = await this.file2Base64(file);
      this.file = file;

      this.update();
    } catch (err) {
      // do nothing
    }
  }

  /**
   * ファイルのBlobデータを読み込む
   */
  async file2Base64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const { target } = e;

        if (!target) {
          reject();

          return;
        }

        const { result } = target as any;

        if (typeof result !== 'string') {
          reject();

          return;
        }

        resolve(result);
      };

      reader.readAsDataURL(file);
    });
  }
}
</script>

<style lang="sass" scoped>
.app-file-input
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

.dummy-field
  &
    position: relative
    display: block
    cursor: pointer

  & > .field
    position: absolute
    top: 0
    left: 0
    visibility: hidden

  & > .empty
    position: relative
    width: 100%
    background: $_secondary
    border: 1px solid rgba($_primary, $_light-lg)
    border-radius: $layout-radius-md

  & > .empty::before
    display: block
    padding-top: 56.25%
    content: ''

  & > .empty > .icon
    position: absolute
    top: 50%
    left: 50%
    font-size: $font-xlg
    color: rgba($_primary, $_light-md)
    transform: translate(-50%, -50%)

  & > .preview > .image
    display: block
    max-width: 100%
    border-radius: $layout-radius-md

</style>
