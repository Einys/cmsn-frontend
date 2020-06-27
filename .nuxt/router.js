import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b2181e8c = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages_About" */))
const _33a959a4 = () => interopDefault(import('..\\pages\\Help.vue' /* webpackChunkName: "pages_Help" */))
const _30ad8f32 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _9a1d76fe = () => interopDefault(import('..\\pages\\List.vue' /* webpackChunkName: "pages_List" */))
const _d83a235c = () => interopDefault(import('..\\pages\\NotFound.vue' /* webpackChunkName: "pages_NotFound" */))
const _136389f5 = () => interopDefault(import('..\\pages\\Privacy.vue' /* webpackChunkName: "pages_Privacy" */))
const _1053e4a1 = () => interopDefault(import('..\\pages\\t\\index.vue' /* webpackChunkName: "pages_t_index" */))
const _70a989b4 = () => interopDefault(import('..\\pages\\Terms.vue' /* webpackChunkName: "pages_Terms" */))
const _52da212e = () => interopDefault(import('..\\pages\\User.vue' /* webpackChunkName: "pages_User" */))
const _d0068218 = () => interopDefault(import('..\\pages\\i\\_id.vue' /* webpackChunkName: "pages_i__id" */))
const _897ceed0 = () => interopDefault(import('..\\pages\\u\\_name.vue' /* webpackChunkName: "pages_u__name" */))
const _68285b62 = () => interopDefault(import('..\\pages\\t\\_cat\\_intent\\index.vue' /* webpackChunkName: "pages_t__cat__intent_index" */))
const _4f39ab9f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
    component: _b2181e8c,
    name: "About"
  }, {
    path: "/Help",
    component: _33a959a4,
    name: "Help"
  }, {
    path: "/inspire",
    component: _30ad8f32,
    name: "inspire"
  }, {
    path: "/List",
    component: _9a1d76fe,
    name: "List"
  }, {
    path: "/NotFound",
    component: _d83a235c,
    name: "NotFound"
  }, {
    path: "/Privacy",
    component: _136389f5,
    name: "Privacy"
  }, {
    path: "/t",
    component: _1053e4a1,
    name: "t"
  }, {
    path: "/Terms",
    component: _70a989b4,
    name: "Terms"
  }, {
    path: "/User",
    component: _52da212e,
    name: "User"
  }, {
    path: "/bot/my",
    component: _2e1bf802,
    name: "bot-my"
  }, {
    path: "/bot/:cat?",
    component: _307954b7,
    name: "bot-cat"
  }, {
    path: "/i/:id?",
    component: _d0068218,
    name: "i-id"
  }, {
    path: "/u/:name?",
    component: _897ceed0,
    name: "u-name"
  }, {
    path: "/t/:cat/:intent?",
    component: _68285b62,
    name: "t-cat-intent"
  }, {
    path: "/",
    component: _4f39ab9f,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
