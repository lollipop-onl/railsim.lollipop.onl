<template>
  <div class="author-page">
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

  get user() {
    const { userId } = this.$route.params;

    return this.$store.state.user.userData[userId];
  }

  async beforeMount(): Promise<void> {
    const { userId } = this.$route.params;

    try {
      await this.$store.dispatch('user/fetchUserProfile', userId);
    } catch (err) {
      this.$nuxt.error({ statusCode: 404, message: 'Page Not Found' });

      return;
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
