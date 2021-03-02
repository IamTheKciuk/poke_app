import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const [active, setActive] = useState("");
    const linksContainerRef = useRef(null);

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

    useEffect(() => {
        if (showLinks) {
            linksContainerRef.current.style.height = `200px`;
        } else {
            linksContainerRef.current.style.height = "0px";
        }
    }, [showLinks]);

    return (
        <nav className="navbar">
            <div className="links-container" ref={linksContainerRef}>
                <Link
                    to="/"
                    className="nav-link"
                    id="home"
                    onClick={() => {
                        setActive("home");
                        setShowLinks(!showLinks);
                    }}
                >
                    Home
                </Link>
                <Link
                    to="/pokemon-list"
                    className="nav-link"
                    id="pokemon-list"
                    onClick={() => {
                        setActive("pokemon-list");
                        setShowLinks(!showLinks);
                    }}
                >
                    Pokemon list
                </Link>
                <Link
                    to="/about"
                    className="nav-link"
                    id="about"
                    onClick={() => {
                        setActive("about");
                        setShowLinks(!showLinks);
                    }}
                >
                    About
                </Link>
            </div>
            <div
                className="nav-toggle"
                onClick={() => setShowLinks(!showLinks)}
            >
                <TiThMenu className="nav-icon" />
            </div>
        </nav>
    );
};

export default Navbar;
