import NuevoHorno from "./components/NuevoHorno";
import Hornos from "./components/Hornos";
import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "./utils";
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

  const [hornos, setHornos] = useState([]);

  const addHornoHandler = (hornos) => {

    setHornos((prevHornos) => {
      return [hornos, ...prevHornos];
    });
  };
  //Codigo que se ejecuta al cargarse el componente
  useEffect(() => {
    const socket = io(BASE_URL);
    socket.on("newData", async () => {
      axios.get(`${BASE_URL}/dashboard/ovens`).then((res) => {
        setHornos(res.data);
      });
    });
  }, []);
  //lo que se muestra en pantalla
  return (
    <div>
      {/* boton de agregar horno */}
      <NuevoHorno onAddHorno={addHornoHandler} />
      {/* aqui se muestran los hornos registrados con los datos en tiempo real */}
      <Hornos item={hornos} />
    </div>
  );
};

export default App;
