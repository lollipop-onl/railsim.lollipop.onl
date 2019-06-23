<template>
  <hr class="app-separation">
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class AppSeparation extends Vue {
}
</script>

<style lang="sass" scoped>
.app-separation
  &
    margin: $layout-margin-lg 0
    border: none
    border-bottom: 1px solid $_secondary
</style>
