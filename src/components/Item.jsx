import useApi from "../hooks/useApi";
import PokemonModel from "../model/PokemonModel";

const Item = (props) => {

    const { data, error, isFetching } = useApi(`pokemon/${props.id}`);

    let pokemon = null;

    let backgroundType = null;

    if (!isFetching) {
        pokemon = new PokemonModel(data);
        backgroundType = pokemon?.img ? pokemon?.type.toLowerCase() : "bc-404";
    }

    return (
        <div className="pokemon">
            <div className={`pokemon-img ${backgroundType}-gradient`}>
                <img src={pokemon?.img}  alt={`Foto do ${pokemon?.name}`}></img>
            </div>
            <div className="pokemon-id">
                #{ pokemon?.id }
            </div>
            <div className="pokemon-name">
                { pokemon?.name }
            </div>
            <div className={`pokemon-type ${backgroundType}`}>
                { pokemon?.type }
            </div>
        </div>
    )

}

export default Item;