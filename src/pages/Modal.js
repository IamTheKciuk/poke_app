import React from "react";
import { FaWeightHanging } from "react-icons/fa";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { GiHealthNormal, GiStripedSword, GiShield } from "react-icons/gi";

const Modal = ({ pokemon, showMoreInfo }) => {
    const { id, name, height, weight, types, stats } = pokemon.pokemon;

    return (
        <section className="modal-container" onClick={() => showMoreInfo()}>
            <div className="modal-card">
                <div className="modal-title">
                    <h3>{name}</h3>
                    <div className="modal-title-id">
                        <p>{id}</p>
                    </div>
                </div>
                <div className="modal-img-wrapper">
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt=""
                    />
                </div>
                <div className="modal-desc">
                    <div className="modal-stats-left">
                        <p className="row-stat">
                            <GiHealthNormal className="icon" />
                            {stats[0].base_stat}
                        </p>
                        <p className="row-stat">
                            <GiStripedSword className="icon" />
                            {stats[1].base_stat}
                        </p>
                        <p className="row-stat">
                            <GiShield className="icon" />
                            {stats[2].base_stat}
                        </p>
                    </div>
                    <div className="modal-stats-right">
                        <p className="row-stat">
                            <FaWeightHanging className="icon" />
                            {weight}
                        </p>
                        <p className="row-stat">
                            <AiOutlineColumnHeight className="icon" />
                            {height}
                        </p>
                        <div className="modal-type">
                            <p className="types-text">Types:</p>
                            {types.map((type, index) => {
                                if (index > 0)
                                    return (
                                        <span key={index}>
                                            , {type.type.name}
                                        </span>
                                    );
                                return (
                                    <span key={index}>{type.type.name}</span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Modal;
