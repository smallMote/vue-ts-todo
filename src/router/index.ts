import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/todo-list',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/todo-list',
    name: 'todo-list',
    redirect: '/todo-list/list',
    component: () => import('../views/TodoList.vue'),
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('../components/todo-list/List.vue'),
      },
      {
        path: 'card',
        name: 'card',
        component: () => import('../components/todo-list/Card.vue'),
      },
      {
        path: 'other',
        name: 'other',
        component: () => import('../components/todo-list/Other.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});

export default router;
