import NuxtConfiguration from '@nuxt/config';

const config: NuxtConfiguration = {
  build: {
    hardSource: true,
    typescript: {
      typeCheck: true,
    },
  },
  css: ['reset.css', '~assets/styles/root.sass'],
  env: {},
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap&subset=japanese' },
      { rel: 'stylesheet', href: '//unpkg.com/ionicons@4.5.10-1/dist/css/ionicons.min.css' },
    ],
    title: 'RailSim Plugin Store',
  },
  extensions: ['js', 'ts'],
  mode: 'spa',
  modules: ['@nuxtjs/style-resources'],
  router: {
    linkActiveClass: '-active',
    linkExactActiveClass: '-active-exact',
  },
  srcDir: 'src/',
  styleResources: {
    sass: [
      '~assets/styles/vars/*.sass',
      '~assets/styles/mixins/*.sass',
      '~assets/styles/base/*.sass',
    ],
  },
  watch: ['~assets/styles/**/*.sass'],
};

export default config;
