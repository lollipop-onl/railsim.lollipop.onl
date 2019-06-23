import { bind, debounce } from 'helpful-decorators';
import { Component, Vue } from 'nuxt-property-decorator';

/**
 * ページ初期化の処理を行うMixin
 */
@Component
export default class PageInitializerMixin extends Vue {
  /** ライフサイクル */
  public mounted(): void {
    // vhの初期値を設定する
    this.updateVh();

    // リサイズ時にvhの更新を設定する
    window.addEventListener('resize', this.updateVh);
  }

  /** ライフサイクル */
  public beforeDestroy(): void {
    window.removeEventListener('resize', this.updateVh);
  }

  /**
   * vhの値を更新する
   */
  @bind
  @debounce(200)
  private updateVh(): void {
    const vh = window.innerHeight * 0.01;
    const { documentElement } = document;

    if (documentElement instanceof HTMLElement) {
      documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }
}
