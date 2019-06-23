<template>
  <div>
    <img
      src="~assets/images/common/logo-lg.svg"
      style="height: 18px"
    >
    <h1>Hello World</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  layoutProps: {
    hello: 'world',
  },
})
export default class IndexPage extends Vue {
}
</script>

<style lang="sass" scoped></style>
