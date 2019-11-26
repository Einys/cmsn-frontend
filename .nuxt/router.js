import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

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

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
    component: _de6d70ae,
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
    component: _390f028e,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
