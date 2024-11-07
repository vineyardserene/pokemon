import axios from "axios";

class PokemonAPI {
    // Method untuk mendapatkan daftar Pokemon dengan parameter opsional
    async getPokemon(params = '') {
        const url = `/pokemon${params}`;
        return await axios.get(url);
    }

    // Method untuk mendapatkan data Pokemon berdasarkan URL yang diberikan
    async getPokemonUrl(url) {
        return await axios.get(url);
    }

    // Method untuk mendapatkan detail Pokemon berdasarkan ID
    async getPokemonDetails(id) {
        return await axios.get(`/pokemon/${id}`);
    }

    // Method untuk mendapatkan detail Pokemon berdasarkan nama
    async getPokemonByName(name) {
        return await axios.get(`/pokemon/${name}`);
    }
}

// Membuat instance baru dari kelas PokemonAPI
export default new PokemonAPI();
