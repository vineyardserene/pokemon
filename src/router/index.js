import { createRouter, createWebHistory } from 'vue-router'
import PokemonView from '../views/Pokemon.vue'
import DetailPokemonView from '../views/DetailPokemon.vue'
import PokedexView from '../views/Pokedex.vue'


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
    path: '/pokedex',
    name: 'Pokedex',
    component: PokedexView 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
