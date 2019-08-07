import Vue from 'vue'
import Router from 'vue-router'

/*
//引入第一个页面
import Home from './views/Home.vue'
*/

//引入页面模板->供路由使用
import index from './pages/index.vue';
import pageQuiButton from './pages/pageQuiButton';
import pageQuiList from './pages/pageQuiList';
import pageQuiNav from './pages/pageQuiNav';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/btn',
      name: 'btn',
      component: pageQuiButton,
    },
    {
      path: '/list',
      name: 'list',
      component: pageQuiList,
    },
    {
      path: '/nav',
      name: 'nav',
      component: pageQuiNav,
    }
  ]
})
