import { useState } from "react";
import Item from "../components/Item";
import useApi from "../hooks/useApi";
import PokemonModel from "../model/PokemonModel";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Pokemons = () => { 

    const limit = 3;
    const offset = 0;
    let startPage = 0;
    let endPage = 0;
    let total = 0;
    
    const [ page, setPage ] = useState(0);

    const { data, error, isFetching } = useApi(`pokemon/?offset=${offset + (limit * page)}&limit=${limit}`);

    let pokemons = [];

    if (!isFetching) {

        startPage = ((page + 1) * limit) - (limit - 1);
        endPage = (page + 1) * limit;
        total = data?.count;

        data?.results.forEach(obj => {
            pokemons.push(new PokemonModel(obj));
        });
    }

    function proximo() {
        window.scrollTo(0, 0);
        setPage(page + 1);
    }

    function anterior() {
        if(page > 0) {
            window.scrollTo(0, 0);
            setPage(page - 1);
        }
    }

    return (
        <>
            <div className="h1">
                <div>Pokemons</div>
            </div>
            {
                <div className="results">
                    <span>{`Results: ${startPage} ... ${endPage} / ${total}`}</span>
                </div>
            }
            <div className="pokemons">
                {
                    !isFetching && !error &&
                    pokemons.map((obj, x) => { 
                        return (
                            <div key={x}>
                                <Item id={obj.id} />
                            </div>
                        )
                    }) 
                }
            </div>
            {
                !isFetching && !error &&
                <div className="btns">
                    <button className="btn-seta" onClick={anterior} disabled={(offset + (limit * page)) < 1 ? true : false}><FontAwesomeIcon icon={faArrowLeft} /></button>
                    <span className="page">{ page + 1 }</span>
                    <button className="btn-seta" onClick={proximo} disabled={isFetching || ((offset + (limit * page)) + limit) >= total ? true : false}><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            }
        </>
    );
}

export default Pokemons;