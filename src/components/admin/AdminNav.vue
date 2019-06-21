<template>
  <ul class="admin-nav">
    <li class="item">
      <n-link
        class="nav-link"
        to="/admin/dashboard"
      >
        <i class="ti-shield icon" />
        Dashboard
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="nav-link"
        to="/admin/user"
      >
        <i class="ti-user icon" />
        User
      </n-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AdminSidebar extends Vue {
}
</script>

<style lang="sass" scoped>
.admin-nav
  & > .item
    margin-bottom: 4px

.nav-link
  &
    box-sizing: border-box
    display: flex
    align-items: center
    width: 100%
    height: 42px
    padding: 0 16px
    font-size: 14px
    color: #333
    text-decoration: none
    border-radius: 8px

  &.-active,
  &:hover
    background: rgba(#fff, 0.4)

  &.-active
    color: #248afd

  & > .icon
    margin-right: 0.8em
    font-size: 1.2em
</style>
