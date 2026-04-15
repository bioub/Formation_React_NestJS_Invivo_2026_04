import { useEffect, useState } from "react";
import PokemonCardDetails from "../components/pokemon-card-details";
import { Pokemon } from "../models/pokemon";
import { getPokemon } from "../services/pokemon-service";
import Loader from "../components/loader";
import { useCompare } from "../helpers/compare-context";
import { Navigate } from "react-router-dom";

function PokemonCompare() {
  const { pokemonsIds } = useCompare();

    const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
    const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);

    useEffect(() => {
        // getPokemon(pokemonsIds[0]).then((pokemon) => {
        //     setPokemon1(pokemon!);
        // });
        // getPokemon(pokemonsIds[1]).then((pokemon) => {
        //     setPokemon2(pokemon!);
        // });

        Promise.all(pokemonsIds.map((id) => getPokemon(id))).then((pokemons) => {
            setPokemon1(pokemons[0]!);
            setPokemon2(pokemons[1]!);
        });
    }, [pokemonsIds]);


    if (pokemonsIds.length !== 2) {
        return <Navigate to="/pokemons" />;
    }

  return (
    <div>
      <div className="row">
          <div className="col s12 m6">
            {!pokemon1 ? <Loader /> : <PokemonCardDetails pokemon={pokemon1} />}
          </div>
          <div className="col s12 m6">
            {!pokemon2 ? <Loader /> : <PokemonCardDetails pokemon={pokemon2} />}
          </div>
        </div>
    </div>
  );
}

export default PokemonCompare;