import "./card.css";

function Card({ modal, pokemon }) {
  return (
    <div className='card'>
      {pokemon.map((pokemon) => (
        <div key={pokemon?.id} onClick={() => modal(pokemon?.id)}>
          <div className='pokemon'>
            <div className='pokemon-name'>{pokemon.name}</div>
            <div>
              {pokemon.types.map((pokemon) => (
                <span className='type'>{pokemon.type.name}</span>
              ))}
            </div>
            <img
              className='pokemon-img'
              alt='pokephoto'
              src={pokemon.sprites.front_default}
            ></img>

            <div>
              <div>Abilities: </div>
              {pokemon.abilities.map((pokemon) => (
                <span className='ability'>{pokemon.ability.name} </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
