<template>
  <div class="author-page">
    <template v-if="isLoading">
      <img src="~assets/images/common/spinner-primary.svg">
    </template>
    <template v-else>
      <AuthorProfile
        v-if="user"
        :user="user"
        class="header"
      />
      <AppHeading>ピックアップ</AppHeading>
      <AppPluginList />
      <AppSeparation />
      <AppHeading
        link-to="#"
        link-text="すべてを表示"
      >
        公開中のプラグイン
      </AppHeading>
      <AppPluginList />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppHeading from '@/components/ui/AppHeading.vue';
import AppPluginList from '@/components/ui/AppPluginList.vue';
import AppSeparation from '@/components/ui/AppSeparation.vue';
import AuthorProfile from '@/components/page/author/Profile.vue';
import { RootStore } from '@/types/vuex';

@Component({
  components: {
    AppHeading,
    AppPluginList,
    AppSeparation,
    AuthorProfile,
  },
  layoutProps(this: AuthorPage) {
    return {
      breadcrumbs: [
        { title: this.user && this.user.name },
      ],
    };
  },
})
export default class AuthorPage extends Vue {
  $store!: RootStore;

  /** ローディング状態 */
  isLoading = false;

  get user() {
    const { userId } = this.$route.params;

    return this.$store.state.user.userData[userId];
  }

  async beforeMount(): Promise<void> {
    const { userId } = this.$route.params;

    this.isLoading = true;

    try {
      await this.$store.dispatch('user/fetchUserProfile', userId);
    } catch (err) {
      this.$nuxt.error({ statusCode: 404, message: 'Page Not Found' });
    } finally {
      this.isLoading = false;
    }

    if (!this.user) {
      this.$nuxt.error({ statusCode: 404 });
    }
  }
}
</script>

<style lang="sass" scoped>
.author-page
  & > .header
    margin-bottom: $layout-margin-lg
</style>
