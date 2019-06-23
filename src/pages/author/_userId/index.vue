<template>
  <div class="author-page">
    <AuthorProfile class="header" />
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
        { title: '作者インデックス', to: '/' },
        { title: 'ユーザー名' },
      ],
    };
  },
})
export default class AuthorPage extends Vue {
}
</script>

<style lang="sass" scoped>
.author-page
  & > .header
    margin-bottom: $layout-margin-lg
</style>
