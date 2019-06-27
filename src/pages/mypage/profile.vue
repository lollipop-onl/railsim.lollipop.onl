<template>
  <div class="profile-page">
    <AppHeading>プロフィール変更</AppHeading>
    <form
      v-if="editingProfile"
      @submit.prevent="onSubmit"
    >
      <AppForm>
        <AppFormRow title="ユーザ名">
          <AppInput
            v-model="editingProfile.name"
            name="userName"
            data-vv-as="ユーザー名"
            :max-length="50"
            validate="required|min:5|max:50"
            :error="errors.first('userName')"
          />
        </AppFormRow>
        <AppFormRow title="BIO">
          <AppInput
            v-model="editingProfile.bio"
            name="bio"
            data-vv-as="BIO"
            validate="max:120"
            :error="errors.first('bio')"
            :max-length="120"
          />
        </AppFormRow>
        <button
          class="button-base -primary -block"
          type="submit"
        >
          変更を保存
        </button>
      </AppForm>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator';
import AppHeading from '@/components/ui/AppHeading.vue';
import AppForm from '@/components/ui/AppForm.vue';
import AppFormRow from '@/components/ui/AppFormRow.vue';
import AppInput from '@/components/ui/AppInput.vue';
import { UserProfile } from '@/models';
import { RootStore } from '@/types/vuex';

@Component({
  components: {
    AppHeading,
    AppForm,
    AppFormRow,
    AppInput,
  },
  layoutProps() {
    return {
      breadcrumbs: [
        { title: 'マイページ', to: '/mypage' },
        { title: 'プロフィール変更' },
      ],
    };
  },
  $_veeValidate: { // eslint-disable-line @typescript-eslint/camelcase
    validator: 'new',
  },
})
export default class MypageProfilePage extends Vue {
  $store!: RootStore;

  /** 編集中のプロフィール */
  editingProfile: UserProfile['Value'] = {};

  /**
   * フォームが送信されたときの処理
   */
  async onSubmit(): Promise<void> {
    try {
      await this.$store.dispatch('auth/updateUserProfile', this.editingProfile);

      this.$toast.success('ユーザープロフィールを更新しました');
    } catch (err) {
      this.$toast.error('エラーが発生しました');
    }
  }

  /**
   * 編集中のプロフィールをリセットする
   */
  @Watch('$store.state.auth', { immediate: true, deep: true })
  resetEditingProfile(): void {
    const { profile } = this.$store.state.auth;

    this.editingProfile = profile;
  }
}
</script>

<style lang="sass" scoped>
</style>
