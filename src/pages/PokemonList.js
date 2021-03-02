import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import pokeballImage from "../images/pokeball.png";

import Pokemon from "./Pokemon";
import Modal from "./Modal";
const url = "https://pokeapi.co/api/v2/pokemon?limit=1118";

const PokemonList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemonList, setFilteredPokemonList] = useState([]);
    const [type, setType] = useState("all");
    const [isFilter, setIsFilter] = useState({ show: false, filter: "" });
    const [pageIndex, setPageIndex] = useState(1);
    const [pokemonModal, setPokemonModal] = useState({
        show: false,
        pokemon: {},
    });

    // set type
    const setTypeFilter = (chosenType) => {
        setPageIndex(1);

        if (chosenType === "all") {
            fetchData(`https://pokeapi.co/api/v2/pokemon?limit=1118`);
        }

        if (chosenType !== "all") {
            fetchData(`https://pokeapi.co/api/v2/type/${chosenType}`);
        }

        setType(chosenType);
    };

    // fetch data
    const fetchData = async (url) => {
        setIsLoading(true);

        try {
            const response = await fetch(url);
            const pokemons = await response.json();
            setPokemonList(pokemons);

            setIsLoading(false);
        } catch {}
    };

    // useEffect -> initial load
    useEffect(() => {
        fetchData(url);
    }, []);

    // handle next page
    const handleNext = () => {
        if (isFilter.show) {
            if (type === "all" && pageIndex < filteredPokemonList.length / 20) {
                setPageIndex(pageIndex + 1);
            }

            if (type !== "all" && pageIndex < filteredPokemonList.length / 20) {
                setPageIndex(pageIndex + 1);
            }
        } else {
            if (type === "all" && pageIndex < pokemonList.results.length / 20) {
                setPageIndex(pageIndex + 1);
            }

            if (type !== "all" && pageIndex < pokemonList.pokemon.length / 20) {
                setPageIndex(pageIndex + 1);
            }
        }
    };

    // handle previous page
    const handlePrevious = () => {
        if (type === "all" && pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }

        if (type !== "all" && pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };

    // displaying modal with pokemon info
    const showMoreInfo = (pokemon = {}) => {
        if (pokemonModal.show === true) {
            setPokemonModal({ show: false, pokemon: {} });
        } else {
            setPokemonModal({ show: true, pokemon: { pokemon } });
        }
    };

    // handling searching by name
    const setSearchName = (isFiltering = false, filter = "") => {
        setIsFilter({ show: isFiltering, filter: filter });
        setPageIndex(1);
        let filteredList = [];

        if (type === "all") {
            if (filter) {
                filteredList = pokemonList.results.filter((item) => {
                    if (item.name.indexOf(filter.toLowerCase()) > -1)
                        return item;
                });
            }
        } else {
            if (filter) {
                filteredList = pokemonList.pokemon.filter((item) => {
                    if (item.pokemon.name.indexOf(filter.toLowerCase()) > -1)
                        return item;
                });
            }
        }
        setFilteredPokemonList(filteredList);
    };

    // render if type is other than ALL
    if (type !== "all") {
        return (
            <>
                {pokemonModal.show ? (
                    <Modal
                        pokemon={pokemonModal.pokemon}
                        showMoreInfo={showMoreInfo}
                    ></Modal>
                ) : (
                    <></>
                )}
                <section className="page pokemon-list-page">
                    <div className="left-column">
                        <Filter
                            setTypeFilter={setTypeFilter}
                            setSearchName={setSearchName}
                        />
                    </div>
                    <div className="right-column">
                        <div className="list-container">
                            {isLoading ? (
                                <p>Loading</p>
                            ) : isFilter.show ? (
                                filteredPokemonList.map((pokemon, index) => {
                                    if (
                                        index > pageIndex * 20 - 1 ||
                                        index < (pageIndex - 1) * 20
                                    ) {
                                        return;
                                    }
                                    return (
                                        <Pokemon
                                            key={index}
                                            {...pokemon.pokemon}
                                            showMoreInfo={showMoreInfo}
                                        />
                                    );
                                })
                            ) : (
                                pokemonList.pokemon.map((pokemon, index) => {
                                    if (
                                        index > pageIndex * 20 - 1 ||
                                        index < (pageIndex - 1) * 20
                                    ) {
                                        return;
                                    }
                                    return (
                                        <Pokemon
                                            key={index}
                                            {...pokemon.pokemon}
                                            showMoreInfo={showMoreInfo}
                                        />
                                    );
                                })
                            )}
                        </div>
                        <div className="next-previous-container">
                            <FaChevronLeft
                                className="nav-left"
                                onClick={() => handlePrevious()}
                            />
                            <span>{pageIndex}</span>
                            <FaChevronRight
                                className="nav-right"
                                onClick={() => handleNext()}
                            />
                        </div>
                    </div>
                </section>
            </>
        );
    }

    //render if type is ALL
    if (type === "all") {
        return (
            <>
                {pokemonModal.show ? (
                    <Modal
                        pokemon={pokemonModal.pokemon}
                        showMoreInfo={showMoreInfo}
                    ></Modal>
                ) : (
                    <></>
                )}
                <section className="page pokemon-list-page">
                    <div className="left-column">
                        <Filter
                            setTypeFilter={setTypeFilter}
                            setSearchName={setSearchName}
                        />
                    </div>
                    <div className="right-column">
                        <div className="list-container">
                            {isLoading ? (
                                <p>Loading</p>
                            ) : isFilter.show ? (
                                filteredPokemonList.map((pokemon, index) => {
                                    if (
                                        index > pageIndex * 20 - 1 ||
                                        index < (pageIndex - 1) * 20
                                    ) {
                                        return;
                                    }
                                    return (
                                        <Pokemon
                                            key={index}
                                            {...pokemon}
                                            showMoreInfo={showMoreInfo}
                                        />
                                    );
                                })
                            ) : (
                                pokemonList.results.map((pokemon, index) => {
                                    if (
                                        index > pageIndex * 20 - 1 ||
                                        index < (pageIndex - 1) * 20
                                    ) {
                                        return;
                                    }
                                    return (
                                        <Pokemon
                                            key={index}
                                            {...pokemon}
                                            showMoreInfo={showMoreInfo}
                                        />
                                    );
                                })
                            )}
                        </div>
                        <div className="next-previous-container">
                            <FaChevronLeft
                                className="nav-left"
                                onClick={() => handlePrevious()}
                            />
                            <span>{pageIndex}</span>
                            <FaChevronRight
                                className="nav-right"
                                onClick={() => handleNext()}
                            />
                        </div>
                    </div>
                </section>
            </>
        );
    }
};

// --- filter component
const Filter = ({ setTypeFilter, setSearchName }) => {
    const [type, setType] = useState("choose");
    const [nameFilter, setNameFilter] = useState("");

    useEffect(() => {
        if (nameFilter) {
            setSearchName(true, nameFilter);
        } else {
            setSearchName();
        }
    }, [nameFilter]);

    useEffect(() => {
        if (type !== "choose") {
            setTypeFilter(type);
        }

        setNameFilter("");
    }, [type]);

    return (
        <div className="filter-container">
            <div className="filter-img-wrapper">
                <img className="pokeball-img" src={pokeballImage} alt="" />
            </div>
            <form className="filter-form">
                <div className="input-control">
                    <label htmlFor="name-search">Pokemon name:</label>
                    <input
                        name="name-search"
                        type="text"
                        className="name-input"
                        placeholder="e.g. Pikachu"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                    <label htmlFor="type">Choose Pokemon type:</label>
                    <select
                        name="type"
                        id="type"
                        className="select"
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    >
                        <option defaultValue value="all">
                            All
                        </option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default PokemonList;
