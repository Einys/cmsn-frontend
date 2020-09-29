import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b2181e8c = () => interopDefault(import('..\\pages\\About.vue' /* webpackChunkName: "pages_About" */))
const _33a959a4 = () => interopDefault(import('..\\pages\\Help.vue' /* webpackChunkName: "pages_Help" */))
const _30ad8f32 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _9a1d76fe = () => interopDefault(import('..\\pages\\List.vue' /* webpackChunkName: "pages_List" */))
const _8e291684 = () => interopDefault(import('..\\pages\\mypage.vue' /* webpackChunkName: "pages_mypage" */))
const _c708a3f8 = () => interopDefault(import('..\\pages\\mypage\\index.vue' /* webpackChunkName: "pages_mypage_index" */))
const _8c49b97a = () => interopDefault(import('..\\pages\\mypage\\following.vue' /* webpackChunkName: "pages_mypage_following" */))
const _4e0945f2 = () => interopDefault(import('..\\pages\\mypage\\items.vue' /* webpackChunkName: "pages_mypage_items" */))
const _782f7824 = () => interopDefault(import('..\\pages\\mypage\\likes.vue' /* webpackChunkName: "pages_mypage_likes" */))
const _6623511b = () => interopDefault(import('..\\pages\\mypage\\login.vue' /* webpackChunkName: "pages_mypage_login" */))
const _3b66e51a = () => interopDefault(import('..\\pages\\mypage\\notifications.vue' /* webpackChunkName: "pages_mypage_notifications" */))
const _d83a235c = () => interopDefault(import('..\\pages\\NotFound.vue' /* webpackChunkName: "pages_NotFound" */))
const _136389f5 = () => interopDefault(import('..\\pages\\Privacy.vue' /* webpackChunkName: "pages_Privacy" */))
const _1053e4a1 = () => interopDefault(import('..\\pages\\t\\index.vue' /* webpackChunkName: "pages_t_index" */))
const _70a989b4 = () => interopDefault(import('..\\pages\\Terms.vue' /* webpackChunkName: "pages_Terms" */))
const _52da212e = () => interopDefault(import('..\\pages\\User.vue' /* webpackChunkName: "pages_User" */))
const _2e1bf802 = () => interopDefault(import('..\\pages\\bot\\my\\index.vue' /* webpackChunkName: "pages_bot_my_index" */))
const _307954b7 = () => interopDefault(import('..\\pages\\bot\\_cat\\index.vue' /* webpackChunkName: "pages_bot__cat_index" */))
const _d0068218 = () => interopDefault(import('..\\pages\\i\\_id.vue' /* webpackChunkName: "pages_i__id" */))
const _cd0b1e2c = () => interopDefault(import('..\\pages\\u\\_name\\index.vue' /* webpackChunkName: "pages_u__name_index" */))
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
    path: "/mypage",
    component: _8e291684,
    children: [{
      path: "",
      component: _c708a3f8,
      name: "mypage"
    }, {
      path: "following",
      component: _8c49b97a,
      name: "mypage-following"
    }, {
      path: "items",
      component: _4e0945f2,
      name: "mypage-items"
    }, {
      path: "likes",
      component: _782f7824,
      name: "mypage-likes"
    }, {
      path: "login",
      component: _6623511b,
      name: "mypage-login"
    }, {
      path: "notifications",
      component: _3b66e51a,
      name: "mypage-notifications"
    }]
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
    component: _cd0b1e2c,
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
