import { useEffect, useState } from "react";
import PokemonCardDetails from "../components/pokemon-card-details";
import { Pokemon } from "../models/pokemon";
import { getPokemon } from "../services/pokemon-service";
import Loader from "../components/loader";

function PokemonCompare() {
    const [pokemon1, setPokemon1] = useState<Pokemon | null>(null);
    const [pokemon2, setPokemon2] = useState<Pokemon | null>(null);

    useEffect(() => {
        getPokemon(1).then((pokemon) => {
            setPokemon1(pokemon!);
        });
        getPokemon(2).then((pokemon) => {
            setPokemon2(pokemon!);
        });
    }, []);

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