import React from "react";
import { Link } from "react-router-dom";
import homeLogo from "../images/home_logo.png";

import { FaChevronRight } from "react-icons/fa";

const Home = () => {
    return (
        <section className="page home-page">
            <div className="logo-container">
                <img src={homeLogo} alt="home_logo" />
            </div>
            <Link className="home-title" to="/pokemon-list">
                <h1>Find'em all!</h1>
                <FaChevronRight className="icon" />
            </Link>
        </section>
    );
};

export default Home;
