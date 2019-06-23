/**
 * @file 要素の外側がクリックされたときにコールバックを実行するディレクティブ
 */

export const outside = {
  inserted: (el: any, binding: any): void => {
    const f = (e: Event): void => {
      // ! HTMLから要素が消えたらリスナーを解除
      if (!document.body.contains(el)) {
        window.removeEventListener('click', f, true);

        return;
      }

      // ! モーダルかアラートの背景が表示されていたらキャンセル
      const isShowModal = document.body.contains(document.getElementById('ui-modal-background'));
      const isShowAlert = document.body.contains(document.getElementById('ui-alert-background'));

      if (isShowModal || isShowAlert) return;

      // - 要素外をクリックしたか
      if (!el.contains(e.target)) {
        const isPrevent = binding.value();

        // 返り値がTrueなら後続処理をキャンセル
        if (isPrevent) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    window.addEventListener('click', f, true);
  },
};
