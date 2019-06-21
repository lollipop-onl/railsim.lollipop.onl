<template>
  <div class="admin-layout">
    <AdminHeader class="header" />
    <div class="admin-container">
      <div class="sidebar">
        <AdminNav />
      </div>
      <div class="main">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import AdminNav from '@/components/admin/AdminNav.vue';

@Component({
  components: {
    AdminHeader,
    AdminNav,
  },
})
export default class AdminLayout extends Vue {
}
</script>

<style lang="sass" scoped>
.admin-layout
  &
    padding-top: 94px

  & > .header
    position: fixed
    top: 0
    left: 0

.admin-container
  &
    display: flex
    box-sizing: border-box
    width: 100%
    padding: 0 20px
    margin: 0 auto

  & > .sidebar
    flex-shrink: 0
    width: 200px
    margin-right: 40px

  & > .main
    flex-grow: 1
</style>

<style lang="sass">
body
  background: #e3e8ef
</style>
