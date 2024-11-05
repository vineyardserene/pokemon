import { createRouter, createWebHistory } from 'vue-router'
import PokemonView from '../views/Pokemon.vue'
import PokemonIsiView from '../views/PokemonIsi.vue'

const routes = [
  {
    path: '/',
    name: 'pokemon',
    component: PokemonView 
  },
  {
    path: '/pokemon-detail/:pokeId',
    name: 'pokemon-detail',
    component: PokemonIsiView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
