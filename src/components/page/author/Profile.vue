<template>
  <div class="author-profile">
    <div class="profile-hero">
      <img
        class="image"
        :src="user.hero"
      >
    </div>
    <div class="profile-content">
      <img
        class="avatar"
        :src="user.avatar"
      >
      <div class="profile">
        <div class="username">
          {{ user.name }}
        </div>
        <div class="id">
          @{{ user.id }}
        </div>
        <div class="bio">
          {{ user.bio }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { UserProfile } from '@/models';

@Component
export default class AuthorProfile extends Vue {
  @Prop({ type: Object, validator: UserProfile.validator })
  user?: UserProfile['Value'];
}
</script>

<style lang="sass" scoped>
.author-profile
  &
    overflow: hidden
    border-radius: $layout-radius-md

.profile-hero
  &
    width: 100%
    height: 160px

  & > .image
    width: 100%
    height: 100%
    object-fit: cover

.profile-content
  &
    display: flex
    padding: 0 $layout-margin-md
    background: $_secondary

  & > .avatar
    position: relative
    display: block
    flex-shrink: 0
    width: 128px
    height: 128px
    margin-top: -$layout-margin-lg
    border-radius: $layout-radius-md

  & > .profile
    padding: $layout-margin-md $layout-margin-sm

  & > .profile > .username
    margin-bottom: $layout-margin-xsm
    font-size: $font-xlg

  & > .profile > .id
    margin-bottom: $layout-margin-sm
    font-size: $font-md
    color: rgba($_text, $_light-md)

  & > .profile > .bio
    font-size: $font-sm
    line-height: 1.5
</style>
