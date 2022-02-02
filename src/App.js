import NuevoHorno from "./components/NuevoHorno";
import Hornos from "./components/Hornos";
import "./App.css";
import react, { useState } from "react";

const INITIAL_HORNOS = [
  {
    id: "1",
    hornoID: "1234",
    horno_temperatura: "700°C",
    horno_porcentaje: "78%",
    horno_tiempo: "1:34",
  },
  {
    id: "2",
    hornoID: "6473",
    horno_temperatura: "608°C",
    horno_porcentaje: "62%",
    horno_tiempo: "0:27",
  },
];

const App = () => {
  const [hornos, setHornos] = useState(INITIAL_HORNOS);
  // const clickHandler = () =>{
  //   console.log("Agrego horno");
  // }

  const addHornoHandler = (hornos) => {
    // console.log('in app.js');
    // console.log(hornos);
    setHornos((prevHornos) => {
      return [hornos, ...prevHornos];
    });
  };

  //lo que se muestra en pantalla
  return (
    <div>
      <div className="rectangulo">@usuario</div>
      {/* boton de agregar horno */}
      <NuevoHorno onAddHorno={addHornoHandler} />
      {/* aqui se muestran los hornos registrados con los datos en tiempo real */}
      <Hornos item={hornos} />
    </div>
  );
};

export default App;
