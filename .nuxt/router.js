import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _f7f4dc0e = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages_About" */))
const _4b4f1485 = () => interopDefault(import('..\\pages\\Help.vue' /* webpackChunkName: "pages_Help" */))
const _7250f434 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _6ad2013c = () => interopDefault(import('..\\pages\\List.vue' /* webpackChunkName: "pages_List" */))
const _7e0dfb5f = () => interopDefault(import('..\\pages\\mypage.vue' /* webpackChunkName: "pages_mypage" */))
const _5f33a043 = () => interopDefault(import('..\\pages\\mypage\\index.vue' /* webpackChunkName: "pages_mypage_index" */))
const _c27c43fc = () => interopDefault(import('..\\pages\\mypage\\following.vue' /* webpackChunkName: "pages_mypage_following" */))
const _10c13831 = () => interopDefault(import('..\\pages\\mypage\\items.vue' /* webpackChunkName: "pages_mypage_items" */))
const _f2bf93a6 = () => interopDefault(import('..\\pages\\mypage\\likes.vue' /* webpackChunkName: "pages_mypage_likes" */))
const _28db435a = () => interopDefault(import('..\\pages\\mypage\\login.vue' /* webpackChunkName: "pages_mypage_login" */))
const _f637af4e = () => interopDefault(import('..\\pages\\mypage\\notifications.vue' /* webpackChunkName: "pages_mypage_notifications" */))
const _cb035e9a = () => interopDefault(import('..\\pages\\NotFound.vue' /* webpackChunkName: "pages_NotFound" */))
const _1adc5118 = () => interopDefault(import('..\\pages\\Privacy.vue' /* webpackChunkName: "pages_Privacy" */))
const _16ef4702 = () => interopDefault(import('..\\pages\\t\\index.vue' /* webpackChunkName: "pages_t_index" */))
const _4dbb2af3 = () => interopDefault(import('..\\pages\\Terms.vue' /* webpackChunkName: "pages_Terms" */))
const _6a7fdc0f = () => interopDefault(import('..\\pages\\User.vue' /* webpackChunkName: "pages_User" */))
const _7b3b64ba = () => interopDefault(import('..\\pages\\bot\\my\\index.vue' /* webpackChunkName: "pages_bot_my_index" */))
const _66fe73d0 = () => interopDefault(import('..\\pages\\bot\\_cat\\index.vue' /* webpackChunkName: "pages_bot__cat_index" */))
const _5d1f4595 = () => interopDefault(import('..\\pages\\i\\_id.vue' /* webpackChunkName: "pages_i__id" */))
const _e402612e = () => interopDefault(import('..\\pages\\u\\_name\\index.vue' /* webpackChunkName: "pages_u__name_index" */))
const _a9b57c64 = () => interopDefault(import('..\\pages\\t\\_cat\\_intent\\index.vue' /* webpackChunkName: "pages_t__cat__intent_index" */))
const _2c4b4cde = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

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
    component: _f7f4dc0e,
    name: "About"
  }, {
    path: "/Help",
    component: _4b4f1485,
    name: "Help"
  }, {
    path: "/inspire",
    component: _7250f434,
    name: "inspire"
  }, {
    path: "/List",
    component: _6ad2013c,
    name: "List"
  }, {
    path: "/mypage",
    component: _7e0dfb5f,
    children: [{
      path: "",
      component: _5f33a043,
      name: "mypage"
    }, {
      path: "following",
      component: _c27c43fc,
      name: "mypage-following"
    }, {
      path: "items",
      component: _10c13831,
      name: "mypage-items"
    }, {
      path: "likes",
      component: _f2bf93a6,
      name: "mypage-likes"
    }, {
      path: "login",
      component: _28db435a,
      name: "mypage-login"
    }, {
      path: "notifications",
      component: _f637af4e,
      name: "mypage-notifications"
    }]
  }, {
    path: "/NotFound",
    component: _cb035e9a,
    name: "NotFound"
  }, {
    path: "/Privacy",
    component: _1adc5118,
    name: "Privacy"
  }, {
    path: "/t",
    component: _16ef4702,
    name: "t"
  }, {
    path: "/Terms",
    component: _4dbb2af3,
    name: "Terms"
  }, {
    path: "/User",
    component: _6a7fdc0f,
    name: "User"
  }, {
    path: "/bot/my",
    component: _7b3b64ba,
    name: "bot-my"
  }, {
    path: "/bot/:cat?",
    component: _66fe73d0,
    name: "bot-cat"
  }, {
    path: "/i/:id?",
    component: _5d1f4595,
    name: "i-id"
  }, {
    path: "/u/:name?",
    component: _e402612e,
    name: "u-name"
  }, {
    path: "/t/:cat/:intent?",
    component: _a9b57c64,
    name: "t-cat-intent"
  }, {
    path: "/",
    component: _2c4b4cde,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
