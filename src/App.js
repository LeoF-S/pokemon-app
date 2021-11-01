import { useEffect, useState } from "react";
import PokemonThumbnail from "./components/PokemonThumbnail";


function App() {

  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore]= useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  
  const getAllPokemons = async ()=>{
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    
    function createPokemonObject (result) {
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        
        setAllPokemons(currenList => [...currenList, data])
  
      })
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
    }
  
  useEffect(()=> {
    getAllPokemons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return(
    <div className="app-container">
      <h1>Pokémon Codex</h1>
      <div className="pokemon-container">
        <div className="all-container">
        { allPokemons.map((pokemon, index) => 
          <PokemonThumbnail 
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.other.dream_world.front_default}
          type={pokemon.types[0].type.name}
          key={index}
          />
        )}
        </div>
        <button className ="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  );
}
export default App;