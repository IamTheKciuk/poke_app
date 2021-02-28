import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import PokemonList from "./pages/PokemonList";

function App() {
    return (
        <Router>
            <Navbar></Navbar>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/pokemon-list">
                    <PokemonList />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
