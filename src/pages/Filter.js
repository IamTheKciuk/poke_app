import React, { useEffect, useState } from "react";

import pokeballImage from "../images/pokeball.png";

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

export default Filter;
