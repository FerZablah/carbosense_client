import React, { useState } from "react";
import "./NuevoHorno.css";
import HornoForms from "./HornoForms.js";

const NuevoHorno = (props) => {
  const [editando, setEditando] = useState(false);

  const saveHornoDataHandler = (enteredHornoData) => {
    const hornoData = {
      ...enteredHornoData,
    };
    //   console.log(hornoData);
    props.onAddHorno(hornoData);
    setEditando(false);
  };

  const empezarEditarHandler = () => {
    setEditando(true);
  };

  const dejarEditar = () => {
    setEditando(false);
  };

  return (
    <div className="nuevo-horno">
      {!editando && (
        <button onClick={empezarEditarHandler} className="agregarHorno">
          Agregar Horno
        </button>
      )}
      {editando && (
        <HornoForms
          onSaveHornoData={saveHornoDataHandler}
          onCancel={dejarEditar}
        />
      )}
    </div>
  );
};

export default NuevoHorno;
