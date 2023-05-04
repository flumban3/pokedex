import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "./components/card/card";
import Footer from "./components/footer/footer";
import Modal from "./components/modal/modal";

function App() {
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon/"
  );
  const [previousPage, setPreviousPage] = useState();
  const [nextPage, setNextPage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);
  const [modalData, setModalData] = useState();

  async function getPokemon(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        });
    });
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  useEffect(() => {
    fetch(currentPage)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setNextPage(result.next);
        setPreviousPage(result.previous);
        loadingPokemon(result.results);
      });
  }, [currentPage]);

  const next = () => {
    setCurrentPage(nextPage);
  };

  const previous = () => {
    setCurrentPage(previousPage);
  };

  const modal = (pokemonID) => {
    setOpenModal(true);
    setModalData(pokemonData.find((pokemon) => pokemon.id === pokemonID));
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className='App'>
      <div className='pokedex-container'>
        {openModal && (
          <Modal
            closeModal={() => closeModal()}
            pokemon={pokemonData}
            modalData={modalData}
          />
        )}
        <Card pokemon={pokemonData} modal={modal} />
        <Footer
          next={next}
          previous={previous}
          prevPage={previousPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
}

export default App;
