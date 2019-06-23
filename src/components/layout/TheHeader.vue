<template>
  <header class="the-header">
    <n-link
      to="/"
      class="logo"
    >
      <img
        class="image"
        src="~assets/images/common/logo.svg"
        alt="RailSimPluginStore"
      >
    </n-link>
    <div class="header-avatar">
      <button
        :class="{'avatar': true, '-open': isOpenMenu}"
        @click="openMenu"
      >
        <img
          src="~assets/images/dev/avatar.png"
          class="image"
        >
        <i class="icon ion-md-arrow-dropdown" />
      </button>
      <transition name="avatarMenu">
        <TheHeaderMenu
          v-show="isOpenMenu"
          v-outside="closeMenu"
          class="menu"
          @navigate="closeMenu"
        />
      </transition>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheHeaderMenu from '@/components/layout/TheHeaderMenu.vue';
import { outside } from '@/plugins/directives';

@Component({
  components: {
    TheHeaderMenu,
  },
  directives: {
    outside,
  },
})
export default class TheHeader extends Vue {
  /** 会員メニューを開くか */
  isOpenMenu = false;

  /** 会員メニューを開く */
  openMenu(): void {
    this.isOpenMenu = true;
  }

  /** 会員メニューを閉じる */
  closeMenu(): boolean {
    if (!this.isOpenMenu) return false;

    this.isOpenMenu = false;

    return true;
  }
}
</script>

<style lang="sass" scoped>
.the-header
  &
    box-sizing: border-box
    display: flex
    align-items: center
    width: 100%
    height: 56px
    padding: 0 $layout-margin-md
    background: $_primary

  & > .logo
    margin-right: auto

.header-avatar
  position: relative

  & > .avatar
    display: flex
    align-items: center
    cursor: pointer

  & > .avatar > .image
    width: 32px
    height: 32px
    border-radius: $layout-radius-md

  & > .avatar > .icon
    margin-left: $layout-margin-xsm
    font-size: $font-sm
    color: rgba($_white, $_light-md)

  & > .avatar.-open > .icon
    color: $_white

  & > .menu
    position: absolute
    top: 42px
    right: 0
    z-index: 1
    min-width: 160px

.avatarMenu-enter-active,
.avatarMenu-leave-active
  &
    transition: opacity 0.12s $ease-out-quint, transform 0.12s $ease-out-quint

.avatarMenu-enter,
.avatarMenu-leave-to
  &
    opacity: 0
    transform: translate3d(0, $layout-margin-sm, 0)
</style>
