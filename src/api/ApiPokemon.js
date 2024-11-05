import axios from "axios";

class PokemonAPI {
    getPokemon(params = '') {
        const url = `/pokemon${params}`;
        return axios.get(url);
    }

    getPokemonUrl(url) {
        return axios.get(url);
    }

    getPokemonDetails(id) {
        return axios.get(`/pokemon/${id}`);
    }
}

export default new PokemonAPI();
