import React, { useEffect, useState } from "react";

const Pokemon = ({ name, url, showMoreInfo }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState([]);

    //fetch pokemon
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(url);
            const pokemon = await response.json();
            setPokemon(pokemon);
            setIsLoading(false);
        } catch {}
    };

    // fetch data at first render
    useEffect(() => {
        fetchData();
    }, [url]);

    if (isLoading) {
        return <div className="pokemon-card">Loading...</div>;
    }

    return (
        <div className="pokemon-card" onClick={() => showMoreInfo(pokemon)}>
            <div className="pokemon-desc">
                <div className="pokemon-name">
                    <h4>{name}</h4>
                </div>
                <div className="img-wrapper">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        alt={pokemon.name}
                    />
                </div>
                <div className="pokemon-type">
                    {/* draw all types */}
                    {pokemon.types.map((type, index) => {
                        return <p key={index}>{type.type.name}</p>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;
