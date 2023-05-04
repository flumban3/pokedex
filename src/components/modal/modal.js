import "./modal.css";
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState, useEffect } from "react";

function Modal({ closeModal, modalData }) {
  const [evolution, setEvolution] = useState();
  const [text, setText] = useState();

  const getEvolution = (url) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setEvolution(result);
        console.log(result);
      });
  };

  useEffect(() => {
    fetch(modalData.species.url)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        getEvolution(result.evolution_chain.url);
        result.flavor_text_entries.map((text) => {
          if (text.language.name === "en") {
            return setText(text.flavor_text);
          }
        });
      });
  }, [modalData]);

  const convertHeight = (height) => {
    let feet = Math.round(height * 0.32808);
    return feet;
  };

  const convertWeight = (weight) => {
    let pounds = Math.round(weight / 4.5359237);
    return pounds;
  };

  return (
    <div className='modal-background'>
      <div className='modal'>
        <button className='close-modal' onClick={closeModal}>
          X
        </button>
        <div className='pokemon-name'>{modalData.name}</div>
        <div className='img-container'>
          <img
            className='pokemon-pic'
            alt='pokeman'
            src={modalData.sprites.front_default}
          ></img>
        </div>
        <div className='evolutions'>
          Evolution Line:
          {evolution ? <span> {evolution.chain.species?.name}</span> : null}
          {evolution
            ? evolution.chain.evolves_to.map((pokemon) => (
                <span> {pokemon?.species.name} </span>
              ))
            : null}
          {evolution ? (
            <span>
              {" "}
              {evolution.chain.evolves_to[0]?.evolves_to[0]?.species.name}
            </span>
          ) : null}
        </div>
        <div className='pokemon-info'>
          <div className='height'>
            Height: {convertHeight(modalData.height)}'
          </div>
          <div className='weight'>
            Weight: {convertWeight(modalData.weight)} lbs
          </div>
        </div>
        <div className='text'>{text}</div>
        {modalData.stats.map((pokemon) => (
          <span className='pokemon-stat'>
            {pokemon.stat.name}:
            <ProgressBar
              className='pokemon-stat-bar'
              completed={pokemon.base_stat.toString()}
              maxCompleted={255}
              bgColor='#7149C6'
            ></ProgressBar>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Modal;
