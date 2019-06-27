<template>
  <div class="minimal-layout">
    <div class="container">
      <nuxt />
    </div>
    <div class="footer">
      <TheFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheFooter from '@/components/layout/TheFooter.vue';
import PageInitializerMixin from '@/mixins/PageInitializerMixin';
import LayoutMixin from '@/mixins/LayoutMixin';

@Component({
  components: {
    TheFooter,
  },
  mixins: [PageInitializerMixin, LayoutMixin],
})
export default class MinimalLayout extends Vue {}
</script>

<style lang="sass" scoped>
.minimal-layout
  &
    display: flex
    flex-direction: column
    min-height: calc(var(--vh, 1vh) * 100)
    overflow: hidden

  & > .container
    width: 100%

  & > .footer
    padding-top: $layout-margin-xlg
    margin-top: auto
</style>
