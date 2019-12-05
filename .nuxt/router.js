import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _08d29cbf = () => interopDefault(import('../pages/About.vue' /* webpackChunkName: "pages/About" */))
const _8a1ace02 = () => interopDefault(import('../pages/Help.vue' /* webpackChunkName: "pages/Help" */))
const _4c8cf72c = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _3a3a83dc = () => interopDefault(import('../pages/List.vue' /* webpackChunkName: "pages/List" */))
const _6911efa6 = () => interopDefault(import('../pages/NotFound.vue' /* webpackChunkName: "pages/NotFound" */))
const _784748ba = () => interopDefault(import('../pages/Privacy.vue' /* webpackChunkName: "pages/Privacy" */))
const _5aef948e = () => interopDefault(import('../pages/Terms.vue' /* webpackChunkName: "pages/Terms" */))
const _4bb93eee = () => interopDefault(import('../pages/User.vue' /* webpackChunkName: "pages/User" */))
const _346910c2 = () => interopDefault(import('../pages/t/_cat/_intent/index.vue' /* webpackChunkName: "pages/t/_cat/_intent/index" */))
const _9dcf50b8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
    component: _08d29cbf,
    name: "About"
  }, {
    path: "/Help",
    component: _8a1ace02,
    name: "Help"
  }, {
    path: "/inspire",
    component: _4c8cf72c,
    name: "inspire"
  }, {
    path: "/List",
    component: _3a3a83dc,
    name: "List"
  }, {
    path: "/NotFound",
    component: _6911efa6,
    name: "NotFound"
  }, {
    path: "/Privacy",
    component: _784748ba,
    name: "Privacy"
  }, {
    path: "/Terms",
    component: _5aef948e,
    name: "Terms"
  }, {
    path: "/User",
    component: _4bb93eee,
    name: "User"
  }, {
    path: "/t/:cat?/:intent?",
    component: _346910c2,
    name: "t-cat-intent"
  }, {
    path: "/",
    component: _9dcf50b8,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
