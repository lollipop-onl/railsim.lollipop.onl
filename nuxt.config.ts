import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  build: {
    hardSource: true,
    typescript: {
      typeCheck: true,
    },
  },
  css: ['reset.css'],
  env: {},
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: '//cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css' },
    ],
    title: 'RailSim Plugin Store',
  },
  extensions: ['js', 'ts'],
  mode: 'spa',
  modules: ['@nuxtjs/style-resources'],
  router: {
    linkActiveClass: '-active',
    linkExactActiveClass: '-exact-active',
  },
  srcDir: 'src/',
  styleResources: {
    sass: [
      '~assets/styles/vars/*.sass',
      '~assets/styles/mixins/*.sass',
      '~assets/styles/root/*.sass',
    ],
  },
};

export default config;
