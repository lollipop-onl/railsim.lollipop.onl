<template>
  <div>
    <h1>Error!</h1>
    <pre>{{ error }}</pre>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'empty',
})
export default class ErrorLayout extends Vue {
  @Prop({ type: Object }) error: object;
}
</script>

<style lang="sass" scoped>
</style>
