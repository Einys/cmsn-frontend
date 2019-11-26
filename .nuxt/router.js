import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

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

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/About",
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
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
