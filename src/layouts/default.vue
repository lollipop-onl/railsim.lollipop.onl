<template>
  <div class="default-layout">
    <TheHeader />
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
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import PageInitializerMixin from '@/mixins/PageInitializerMixin';

@Component({
  components: {
    TheHeader,
    TheFooter,
  },
  mixins: [PageInitializerMixin],
})
export default class DefaultLayout extends Vue {
}
</script>

<style lang="sass" scoped>
.default-layout
  &
    display: flex
    flex-direction: column
    min-height: calc(var(--vh, 1vh) * 100)
    overflow: hidden

  & > .container
    +container

  & > .footer
    padding-top: $layout-margin-xlg
    margin-top: auto
</style>
