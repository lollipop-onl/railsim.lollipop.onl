<template>
  <nav class="admin-header">
    <h1 class="logo">
      RailSim Plugin Store
    </h1>
    <div class="header-control">
      <button class="avatar">
        <img
          src="http://placehold.jp/320x320.png"
          class="image"
          alt="Avatar"
        >
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AdminHeader extends Vue {
}
</script>

<style lang="sass" scoped>
.admin-header
  &
    display: flex
    align-items: center
    width: 100%
    height: 70px
    box-sizing: border-box
    padding: 0 40px
    background: #fff

  & > .logo
    margin-right: auto

.header-control
  & > .avatar
    width: 62px
    height: 62px
    padding: 10px

  & > .avatar > .image
    display: block
    width: 100%
    height: 100%
    object-fit: cover
    border-radius: 50%
</style>
