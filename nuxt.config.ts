export default {
  build: {
    hardSource: true,
    typescript: {
      typeCheck: true
    }
  },
  css: ['reset.css'],
  env: {},
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    title: 'RailSim Plugin Store'
  },
  extensions: ['js', 'ts'],
  module: ['@nuxtjs/style-resources'],
  router: {},
  srcDir: 'src/',
  styleResources: {
    sass: []
  }
};
