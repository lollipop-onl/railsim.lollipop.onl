import Vue from 'vue';
import * as filters from '.';

Object.entries(filters).forEach(([name, filter]) => {
  Vue.filter(name, filter);
});
