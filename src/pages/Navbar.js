import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [active, setActive] = useState("");

    useEffect(() => {
        let pathname = window.location.pathname.substring(1);
        if (pathname === "") pathname = "home";
        console.log(pathname);
        const active_tab = document.querySelector(`#${pathname}`);
        active_tab.classList.add("active");

        return () => {
            const all_tabs = document.querySelectorAll(`.nav-link`);
            all_tabs.forEach((tab) => {
                tab.classList.remove("active");
            });
        };
    }, [active]);

    return (
        <nav className="navbar">
            <Link
                to="/"
                className="nav-link"
                id="home"
                onClick={() => setActive("home")}
            >
                Home
            </Link>
            <Link
                to="/pokemon-list"
                className="nav-link"
                id="pokemon-list"
                onClick={() => setActive("pokemon-list")}
            >
                Pokemon list
            </Link>
            <Link
                to="/about"
                className="nav-link"
                id="about"
                onClick={() => setActive("about")}
            >
                About
            </Link>
        </nav>
    );
};

export default Navbar;
