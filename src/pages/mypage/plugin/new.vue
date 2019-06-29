<template>
  <div class="mypage-page">
    <AppHeading>プラグイン投稿</AppHeading>
    <MypagePluginForm
      v-model="plugin"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import AppHeading from '@/components/ui/AppHeading.vue';
import MypagePluginForm from '@/components/page/mypage/MypagePluginForm.vue';
import { Plugin } from '@/models';
import { RootStore } from '@/types/vuex';

@Component({
  components: {
    AppHeading,
    MypagePluginForm,
  },
  layoutProps() {
    return {
      breadcrumbs: [
        { title: 'マイページ', to: '/mypage' },
        { title: 'プラグイン', to: '/mypage/plugin' },
        { title: '投稿' },
      ],
    };
  },
  $_veeValidate: { // eslint-disable-line @typescript-eslint/camelcase
    validator: 'new',
  },
})
export default class MypagePage extends Vue {
  $store!: RootStore;

  plugin: Plugin['Value'] = {};

  async onSubmit(): Promise<void> {
    const { userId } = this.$store.state.auth;

    if (!userId) {
      return;
    }

    const bannerUrl = await this.uploadImage(this.plugin.banner);

    const plugin = new Plugin();

    plugin.name = this.plugin.name;
    plugin.description = this.plugin.description;
    plugin.userId = userId;
    plugin.banner = bannerUrl;
    plugin.downloadUrl = this.plugin.downloadUrl;
    plugin.category = this.plugin.category;

    await plugin.save();
  }

  /**
   * アバター画像をアップロードする
   */
  async uploadImage(file: File): Promise<string> {
    const { userId } = this.$store.state.auth;

    if (!userId) {
      throw new Error('ユーザーIDが見つかりませんでした。');
    }

    const uploadTask = this.$firebase.storage.upload(file, userId);

    uploadTask.on('state_changed', ({ bytesTransferred, totalBytes }) => {
      console.log(`${bytesTransferred} / ${totalBytes} (${bytesTransferred / totalBytes}%)`);
    });

    await uploadTask;

    return uploadTask.snapshot.ref.getDownloadURL();
  }
}
</script>

<style lang="sass" scoped>
</style>
