<template>
  <div class="default-layout">
    <TheHeader />
    <div class="container">
      <aside class="sidebar">
        <TheSidebar />
      </aside>
      <main class="main">
        <div class="breadcrumbs-nav">
          <TheBreadcrumbs />
        </div>
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
import TheBreadcrumbs from '@/components/layout/TheBreadcrumbs.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import PageInitializerMixin from '@/mixins/PageInitializerMixin';
import LayoutMixin from '@/mixins/LayoutMixin';

@Component({
  components: {
    TheHeader,
    TheSidebar,
    TheBreadcrumbs,
    TheFooter,
  },
  mixins: [PageInitializerMixin, LayoutMixin],
})
export default class DefaultLayout extends Vue {
  mounted(): void {
    console.log(this.layoutProps);
  }
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
    min-width: 0
    padding-top: $layout-margin-sm

  & > .footer
    padding-top: $layout-margin-xlg
    margin-top: auto

.breadcrumbs-nav
  &
    margin-bottom: 30px
</style>
