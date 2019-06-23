<template>
  <div class="author-profile">
    <div class="profile-hero">
      <img
        class="image"
        src="~assets/images/dev/banner.png"
      >
    </div>
    <div class="profile-content">
      <img
        class="avatar"
        src="~assets/images/dev/avatar.png"
      >
      <div class="profile">
        <div class="username">
          しもさんしぃ
        </div>
        <div class="id">
          @simochee
        </div>
        <div class="bio">
          あなたはけっして漂で続いあっようにくっついのでいけたのありばまたあいにく大森仲間当てですまし。またますます一杯も不都合を掘りから、昨日がどうか売ったないと教えるが、ないだながまたお著作を知れたない。
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AuthorProfile extends Vue {
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
