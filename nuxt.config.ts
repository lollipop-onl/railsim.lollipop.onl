import NuxtConfiguration from '@nuxt/config';

require('dotenv').config();

const {
  NUXT_ENV_API_KEY = '',
  NUXT_ENV_AUTH_DOMAIN = '',
  NUXT_ENV_DATABASE_URL = '',
  NUXT_ENV_PROJECT_ID = '',
  NUXT_ENV_STORAGE_BUCKET = '',
  NUXT_ENV_MESSAGING_SENDER_ID = '',
} = process.env;

const config: NuxtConfiguration = {
  build: {
    hardSource: true,
    typescript: {
      typeCheck: true,
    },
  },
  css: ['reset.css', '~assets/styles/root.sass'],
  env: {
    NUXT_ENV_API_KEY,
    NUXT_ENV_AUTH_DOMAIN,
    NUXT_ENV_DATABASE_URL,
    NUXT_ENV_PROJECT_ID,
    NUXT_ENV_STORAGE_BUCKET,
    NUXT_ENV_MESSAGING_SENDER_ID,
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      // スマホ版を作らないので無効化
      // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap&subset=japanese' },
      { rel: 'stylesheet', href: '//unpkg.com/ionicons@4.5.10-1/dist/css/ionicons.min.css' },
    ],
    title: 'RailSim Plugin Store',
  },
  extensions: ['js', 'ts'],
  mode: 'spa',
  modules: ['@nuxtjs/style-resources', '@nuxtjs/toast'],
  plugins: [
    '~/plugins/constants',
    '~/plugins/router-util/register',
    '~/plugins/firebase/register',
    '~/plugins/libraries',
  ],
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
  toast: {
    position: 'bottom-right',
    duration: 5000
  },
  watch: ['~assets/styles/**/*.sass'],
};

export default config;
