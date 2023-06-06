import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LibroView from '../views/LibroView.vue'
import SearchView from '../views/SearchView.vue'
import CartView from '../views/CartView.vue'
import CrudView from '../views/CrudView.vue'
import RegistroView from '../views/RegistroView.vue'
import ConfirmarView from '../views/ConfirmarView.vue'
import IniciarView from '../views/IniciarView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/about",
      name: 'about',
      component: AboutView
    },
    {
      path: '/libro/:id',
      name: 'libro',
      component: LibroView
    },
    {
      path: '/buscar/:nombre',
      name: 'buscar',
      component: SearchView
    },
    {
      path: '/cart',
      name: 'carrito',
      component: CartView
    },
    {
      path: '/admin',
      name: 'admin',
      component: CrudView
    },
    {
      path: '/registro',
      name: 'resgistro',
      component: RegistroView
    },
    {
      path: '/confirmar/:token',
      name: 'confirmar',
      component: ConfirmarView
    },
    {
      path: '/login',
      name: 'login',
      component: IniciarView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
