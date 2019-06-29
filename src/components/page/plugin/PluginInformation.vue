<template>
  <div class="plugin-information">
    <div class="heading">
      作者
    </div>
    <n-link
      v-if="profile"
      class="plugin-author"
      :to="`/author/${profile.id}`"
    >
      <div class="avatar">
        <img
          class="image"
          :src="profile.avatar"
        >
      </div>
      <div class="username">
        {{ profile.name }}
      </div>
      <div class="id">
        @{{ profile.id }}
      </div>
    </n-link>
    <hr class="separation">
    <div class="heading">
      登録タグ
    </div>
    <div class="plugin-tags">
      <template v-for="categoryId in plugin.category">
        <AppPluginTag
          :key="categoryId"
          category
          :category-id="categoryId"
        />
      </template>
    </div>
    <hr class="separation">
    <dl class="plugin-history">
      <dt class="label">
        初回公開日時
      </dt>
      <dd class="value">
        {{ plugin.createdAt.toMillis() | dayjs('YYYY/MM/DD HH:mm') }}
      </dd>
      <template v-if="isUpdated">
        <dt class="label">
          更新日時
        </dt>
        <dd class="value">
          {{ plugin.updatedAt.toMillis() | dayjs('YYYY/MM/DD HH:mm') }}
        </dd>
      </template>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import AppPluginTag from '@/components/ui/AppPluginTag.vue';
import { dayjs } from '@/plugins/filters';
import { Plugin, UserProfile } from '@/models';

@Component({
  components: {
    AppPluginTag,
  },
  filters: {
    dayjs,
  },
})
export default class PluginInformation extends Vue {
  /** プラグイン */
  @Prop({ type: Object, required: true })
  plugin: Plugin['Value'];

  /** ユーザー情報 */
  @Prop({ type: Object })
  profile?: UserProfile['Value'];

  /** 更新されているか */
  get isUpdated(): boolean {
    const { createdAt, updatedAt } = this.plugin;

    if (!updatedAt) {
      return false;
    }

    console.log(this.plugin);


    return createdAt.seconds !== updatedAt.seconds;
  }
}
</script>

<style lang="sass" scoped>
.plugin-information
  &
    padding: $layout-margin-md $layout-margin-xsm * 1.5
    background: $_secondary
    border-radius: $layout-radius-md

  & > .heading
    margin-bottom: $layout-margin-sm
    font-size: $font-sm
    color: rgba($_text, $_light-md)

  & > .separation
    margin: $layout-margin-md 0
    border: none
    border-bottom: 1px solid rgba($_primary, $_light-lg)

.plugin-author
  &
    display: grid
    grid-template-areas: "avatar username" "avatar id"
    grid-template-columns: auto 1fr
    color: $_text
    text-decoration: none

  & > .avatar
    grid-area: avatar
    margin-right: $layout-margin-xsm

  & > .avatar > .image
    width: 42px
    height: 42px
    border-radius: $layout-radius-md

  & > .username
    grid-area: username
    margin: $layout-margin-xsm / 2 0
    font-size: $font-md
    text-decoration: underline

  & > .id
    grid-area: id
    font-size: $font-sm
    color: rgba($_text, $_light-md)

  &:hover > .username
    text-decoration: none

.plugin-tags
  &
    margin-bottom: -$layout-margin-xsm

.plugin-history
  &
    overflow: hidden
    margin-bottom: -$layout-margin-sm

  & > .label,
  & > .value
    margin-bottom: $layout-margin-sm
    line-height: $font-md

  & > .label
    float: left
    clear: both
    font-size: $font-xsm
    color: rgba($_text, $_light-lg)

  & > .value
    float: right
    font-size: $font-sm
    color: rgba($_text, $_light-md)
</style>
