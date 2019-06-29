<template>
  <div>
    <p>hello you!</p>
    <n-link to="/">
      back to top
    </n-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layout: 'test',
})
export default class TestPage extends Vue {
}
</script>

<style lang="sass" scoped>
</style>
