import React, { useState } from "react";
import HornoForms from "./HornoForms.js";

const NuevoHorno = (props) => {
  const [editando, setEditando] = useState(false);

  const saveHornoDataHandler = (enteredHornoData) => {
    const hornoData = {
      ...enteredHornoData,
    };
    props.onAddHorno(hornoData);
    setEditando(false);
  };

  const empezarEditarHandler = () => {
    setEditando(true);
  };

  const dejarEditar = () => {
    setEditando(false);
  };
  if(!editando){
    return(
    <div className="w-100 text-end p-5">
      <button onClick={empezarEditarHandler} type="button" className="btn btn-secondary ">Agregar Horno</button>
    </div>
    )
  }
  else{
    return(
      <HornoForms
          onSaveHornoData={saveHornoDataHandler}
          onCancel={dejarEditar}
        />
    )
  }
};

export default NuevoHorno;