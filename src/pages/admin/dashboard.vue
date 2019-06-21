<template>
  <AdminContent title="Dashborad">
    <p>hello world.</p>
  </AdminContent>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AdminContent from '@/components/admin/AdminContent.vue';

@Component({
  components: {
    AdminContent,
  },
  layout: 'admin',
})
export default class AdminDashboardPage extends Vue {
}
</script>

<style lang="sass" scoped>
</style>
