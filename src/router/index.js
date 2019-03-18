import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import NProgress from "nprogress"; // не забыть подключить стили в main.js


// чтобы работали динамичиеские импорты нужно установить плагин и прописать найстройку в .babelrc
// https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/
// также сделал alias в webpack.config.js для путей, помоему они тоже начали работать только после установки плагина выше

const Home = () => import('@/pages/Home')
const Cars = () => import('@/pages/Cars')
const Car = () => import('@/pages/Car')
const CarInfo = () => import('@/components/CarInfo')
const MyForm = () => import('@/components/MyForm')
const E404 = () => import('@/components/E404')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/cars',
    name: 'cars',
    component: Cars
  },
  {
    path: '/car/:id',
    name: 'car',
    component: Car,
    children: [
      {
        path: 'info', // /car/:id/info
        name: 'carinfo',
        component: CarInfo
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    component: MyForm,
  },
  {
    path: '*',
    component: E404
  }
];

export const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // return desired position

    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        selector: to.hash
      }
    }

    return {
      x: 0,
      y: 0
    }

  }
});


// добавляем наш NProgress
// https://scotch.io/tutorials/add-loading-indicators-to-your-vuejs-application

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})
