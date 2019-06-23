<template>
  <ul class="category-list">
    <template v-for="({ id, name }) in $C.PLUGIN_CATEGORY">
      <li
        :key="id"
        class="item"
      >
        <n-link
          class="category-item"
          :to="`/category/${id}`"
        >
          <i class="icon ion-ios-train" />
          <div class="name">
            {{ name }}プラグイン
          </div>
        </n-link>
      </li>
    </template>
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
