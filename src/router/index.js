import { createRouter, createWebHistory } from 'vue-router'
import PokemonView from '../views/Pokemon.vue'
import DetailPokemonView from '../views/DetailPokemon.vue'
import PocatchView from '../views/Pocatch.vue'


const routes = [
  {
    path: '/',
    name: 'pokemon',
    component: PokemonView 
  },
  {
    path: '/pokemon-detail/:pokeId',
    name: 'pokemon-detail',
    component: DetailPokemonView
  },
  {
    path: '/pocatch',
    name: 'pocatch',
    component: PocatchView 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
