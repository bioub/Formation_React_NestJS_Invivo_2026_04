import { Link, useNavigate } from 'react-router-dom';
import { Pokemon } from '../models/pokemon';
import './pokemon-card.css';
import { formatDate, formatType } from '../helpers';
import { useCompare } from '../helpers/compare-context';

type Props = {
  pokemon: Pokemon;
  borderColor?: string;
};

function PokemonCard({ pokemon }: Props) {
  const { togglePokemonId, pokemonsIds } = useCompare();
  const navigate = useNavigate();

  function goToPokemon(id: number) {
    navigate(`/pokemons/${id}`);
  }

  return (
    <div className="col s6 m4">
      <div className="card horizontal">
        <div className="card-image">
          <img src={pokemon.picture} alt={pokemon.name} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p>
              <small>{formatDate(pokemon.created)}</small>
            </p>
            {pokemon.types?.map((type) => (
              <span key={type} className={formatType(type)}>
                {type}
              </span>
            ))}
            <label>
              <input type="checkbox" onChange={() => togglePokemonId(pokemon.id ?? 0)} checked={pokemonsIds.includes(pokemon.id ?? 0)} />
              <span>Compare</span>
            </label>
            <Link to={`/pokemons/${pokemon.id}`} className="btn btn-primary">Show</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
