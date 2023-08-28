const BASE_URL = "https://pokeapi.co/api/v2";

// Função para obter a lista inicial de pokemons
export async function getPokemonList( offset: number) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=20&offset=${offset}`);
  const data = await response.json();
  return data.results;
}

export async function getPokemonDetails(name: string) {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  const data = await response.json();
  return data;
}
