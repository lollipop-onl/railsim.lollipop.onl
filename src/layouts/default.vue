<template>
  <div class="default-layout">
    <TheHeader />
    <div class="container">
      <aside class="sidebar">
        <TheSidebar />
      </aside>
      <main class="main">
        <nuxt />
      </main>
    </div>
    <div class="footer">
      <TheFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import PageInitializerMixin from '@/mixins/PageInitializerMixin';

@Component({
  components: {
    TheHeader,
    TheSidebar,
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
    display: flex
    align-items: flex-start

  & > .container > .sidebar
    flex-shrink: 0
    margin-right: $layout-margin-md

  & > .container > .main
    flex-grow: 1

  & > .footer
    padding-top: $layout-margin-xlg
    margin-top: auto
</style>
