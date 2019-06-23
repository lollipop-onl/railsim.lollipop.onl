<template>
  <div class="app-form">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AppForm extends Vue {
}
</script>

<style lang="sass" scoped>
.app-form
  &
    width: 100%
    max-width: 640px
    margin: 0 auto
</style>
