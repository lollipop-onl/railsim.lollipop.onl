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
    title: 'RailSim Plugin Store',
  },
  extensions: ['js', 'ts'],
  mode: 'spa',
  modules: ['@nuxtjs/style-resources'],
  router: {},
  srcDir: 'src/',
  styleResources: {
    sass: [
      '~assets/styles/vars/*.sass',
      '~assets/styles/mixins/*.sass',
    ],
  },
  watch: ['~assets/styles/**/*.sass'],
};

export default config;
