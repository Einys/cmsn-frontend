import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

<<<<<<< HEAD
<<<<<<< HEAD
const _3018e3a6 = () => interopDefault(import('../pages/About.vue' /* webpackChunkName: "pages/About" */))
const _71e45938 = () => interopDefault(import('../pages/Help.vue' /* webpackChunkName: "pages/Help" */))
const _8945bf5a = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _1da777d6 = () => interopDefault(import('../pages/List.vue' /* webpackChunkName: "pages/List" */))
const _36ac03e6 = () => interopDefault(import('../pages/NotFound.vue' /* webpackChunkName: "pages/NotFound" */))
const _31d11c3e = () => interopDefault(import('../pages/Privacy.vue' /* webpackChunkName: "pages/Privacy" */))
const _0c6306c0 = () => interopDefault(import('../pages/Terms.vue' /* webpackChunkName: "pages/Terms" */))
const _ddd5be7c = () => interopDefault(import('../pages/User.vue' /* webpackChunkName: "pages/User" */))
const _11e0b450 = () => interopDefault(import('../pages/t/_cat/_intent/index.vue' /* webpackChunkName: "pages/t/_cat/_intent/index" */))
const _4f42c2ea = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
=======
const _5e41a484 = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages_About" */))
const _aebf27c0 = () => interopDefault(import('..\\pages\\Help.vue' /* webpackChunkName: "pages_Help" */))
const _43b9446b = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _27e856fd = () => interopDefault(import('..\\pages\\List.vue' /* webpackChunkName: "pages_List" */))
const _8c573a64 = () => interopDefault(import('..\\pages\\NotFound.vue' /* webpackChunkName: "pages_NotFound" */))
const _6f7395f9 = () => interopDefault(import('..\\pages\\Privacy.vue' /* webpackChunkName: "pages_Privacy" */))
const _cad67290 = () => interopDefault(import('..\\pages\\Terms.vue' /* webpackChunkName: "pages_Terms" */))
const _705d98ac = () => interopDefault(import('..\\pages\\User.vue' /* webpackChunkName: "pages_User" */))
const _410b5653 = () => interopDefault(import('..\\pages\\t\\_cat\\_intent\\index.vue' /* webpackChunkName: "pages_t__cat__intent_index" */))
const _7924e8a3 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
>>>>>>> 10b7389895b1009468f6fea985247810eca7b6d2
=======
const _de6d70ae = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages_About" */))
const _0165e8d5 = () => interopDefault(import('..\\pages\\Help.vue' /* webpackChunkName: "pages_Help" */))
const _9cf6e0d4 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _fea4589c = () => interopDefault(import('..\\pages\\List.vue' /* webpackChunkName: "pages_List" */))
const _05727d03 = () => interopDefault(import('..\\pages\\NotFound.vue' /* webpackChunkName: "pages_NotFound" */))
const _45823db8 = () => interopDefault(import('..\\pages\\Privacy.vue' /* webpackChunkName: "pages_Privacy" */))
const _5a7ee0a3 = () => interopDefault(import('..\\pages\\Terms.vue' /* webpackChunkName: "pages_Terms" */))
const _2096b05f = () => interopDefault(import('..\\pages\\User.vue' /* webpackChunkName: "pages_User" */))
const _0968eb7e = () => interopDefault(import('..\\pages\\t\\_cat\\_intent\\index.vue' /* webpackChunkName: "pages_t__cat__intent_index" */))
const _390f028e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))
>>>>>>> f6bd61ac1d6fa495f92aefc23ea38948ad8de7df

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
<<<<<<< HEAD
<<<<<<< HEAD
    component: _3018e3a6,
    name: "About"
  }, {
    path: "/Help",
    component: _71e45938,
    name: "Help"
  }, {
    path: "/inspire",
    component: _8945bf5a,
    name: "inspire"
  }, {
    path: "/List",
    component: _1da777d6,
    name: "List"
  }, {
    path: "/NotFound",
    component: _36ac03e6,
    name: "NotFound"
  }, {
    path: "/Privacy",
    component: _31d11c3e,
    name: "Privacy"
  }, {
    path: "/Terms",
    component: _0c6306c0,
    name: "Terms"
  }, {
    path: "/User",
    component: _ddd5be7c,
    name: "User"
  }, {
    path: "/t/:cat?/:intent?",
    component: _11e0b450,
    name: "t-cat-intent"
  }, {
    path: "/",
    component: _4f42c2ea,
=======
    component: _5e41a484,
=======
    component: _de6d70ae,
>>>>>>> f6bd61ac1d6fa495f92aefc23ea38948ad8de7df
    name: "About"
  }, {
    path: "/Help",
    component: _0165e8d5,
    name: "Help"
  }, {
    path: "/inspire",
    component: _9cf6e0d4,
    name: "inspire"
  }, {
    path: "/List",
    component: _fea4589c,
    name: "List"
  }, {
    path: "/NotFound",
    component: _05727d03,
    name: "NotFound"
  }, {
    path: "/Privacy",
    component: _45823db8,
    name: "Privacy"
  }, {
    path: "/Terms",
    component: _5a7ee0a3,
    name: "Terms"
  }, {
    path: "/User",
    component: _2096b05f,
    name: "User"
  }, {
    path: "/t/:cat?/:intent?",
    component: _0968eb7e,
    name: "t-cat-intent"
  }, {
    path: "/",
<<<<<<< HEAD
    component: _7924e8a3,
>>>>>>> 10b7389895b1009468f6fea985247810eca7b6d2
=======
    component: _390f028e,
>>>>>>> f6bd61ac1d6fa495f92aefc23ea38948ad8de7df
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
