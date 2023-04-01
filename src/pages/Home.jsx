import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import { Container, Grid } from "@mui/material";
import axios from "axios";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemon();
  }, []);

  const getPokemon = () => {
    var endpoints = [];
    for (var i = 1; i < 300; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));
  };

  const pokemonFilter = (name) => {
    if (name === "") {
      getPokemon();
    }
    var filteredPokemons = [];
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  return (
    <div>
      <NavBar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {pokemons.map((pokemon, key) => (
            <Grid item xs={2} key={key}>
              {" "}
              <PokemonCard
                name={pokemon.data.name}
                image={pokemon.data.sprites.front_default}
              />{" "}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
