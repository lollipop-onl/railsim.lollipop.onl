/**
 * @file 各種ライブラリをVueへ登録する
 */

import Vue from 'vue';

// VeeValidate
import VeeValidate, { Validator } from 'vee-validate';
// @ts-ignore
import ja from 'vee-validate/dist/locale/ja';

Vue.use(VeeValidate, { inject: false });

Validator.localize('ja', ja);
