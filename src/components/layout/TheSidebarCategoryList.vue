<template>
  <ul class="category-list">
    <li class="item">
      <n-link
        class="category-item"
        to="#"
      >
        <i class="icon ion-ios-train" />
        <div class="name">
          架線柱プラグイン
        </div>
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="category-item"
        to="#"
      >
        <i class="icon ion-ios-train" />
        <div class="name">
          架線プラグイン
        </div>
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="category-item"
        to="#"
      >
        <i class="icon ion-ios-train" />
        <div class="name">
          車輌プラグイン
        </div>
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="category-item"
        to="/"
      >
        <i class="icon ion-ios-train" />
        <div class="name">
          施設プラグイン
        </div>
      </n-link>
    </li>
    <li class="item">
      <n-link
        class="category-item"
        to="#"
      >
        <i class="icon ion-ios-train" />
        <div class="name">
          スキンプラグイン
        </div>
      </n-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheSidebarCategoryList extends Vue {


}
</script>

<style lang="sass" scoped>
.category-list
  &
    padding-right: 12px

  & > .item
    margin-top: $layout-margin-xsm / 2

.category-item
  &
    box-sizing: border-box
    display: flex
    align-items: center
    width: 100%
    height: 42px
    padding-left: $layout-margin-sm
    color: $_primary
    text-decoration: none
    border-top-right-radius: 21px
    border-bottom-right-radius: 21px

  &:hover
    text-decoration: underline

  &.-active
    background: $_white

  & > .icon
    margin-right: $layout-margin-sm
    font-size: 20px

  & > .name
    font-size: $font-md
</style>
