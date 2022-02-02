import React, { useState } from "react";
import "./HornoForms.css";

const HornoForms = (props) => {
  const [enteredID, setEnteredID] = useState("");

  const idHornoChangeHandler = (event) => {
    setEnteredID(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const hornoData = {
      hornoID: enteredID,
      id:Math.random(),
    };

    props.onSaveHornoData(hornoData);
    setEnteredID('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="nuevo-horno__controls"></div>
      <div className="nuevo-horno__control input">
        <label>Ingrese el ID del horno a agregar</label>
        <input
          type="number"
          min="0"
          value={enteredID}
          onChange={idHornoChangeHandler}
        />
      </div>
      <div>
        <button type="submit" className="nuevo-horno_agregar">
          Agregar Horno
        </button>
      </div>
      <div>
        <button
          className="nuevo-horno_cancelar"
          type="button"
          onClick={props.onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default HornoForms;
