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
        v-if="auth.initialized && auth.loggedIn"
        :class="{'avatar': true, '-open': isOpenMenu}"
        @click="openMenu"
      >
        <img
          src="~assets/images/dev/avatar.png"
          class="image"
        >
        <i class="icon ion-md-arrow-dropdown" />
      </button>
      <AppPlaceholder
        v-if="!auth.initialized"
        class="placeholder"
      />
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
import AppPlaceholder from '@/components/ui/AppPlaceholder.vue';
import { outside } from '@/plugins/directives';
import { RootStore } from '@/types/vuex';

@Component({
  components: {
    TheHeaderMenu,
    AppPlaceholder,
  },
  directives: {
    outside,
  },
})
export default class TheHeader extends Vue {
  $store!: RootStore;

  /** 会員メニューを開くか */
  isOpenMenu = false;

  /** 初期化中かどうか */
  get auth() {
    return this.$store.state.auth;
  }

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
  &
    position: relative

  & > .avatar
    display: flex
    align-items: center
    cursor: pointer

  & > .placeholder,
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

  & > .placeholder
    margin-right: 21px

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
