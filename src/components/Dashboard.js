import NuevoHorno from "./NuevoHorno";
import { useEffect, useState } from "react";
import Hornos from "./Hornos";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import axios from "axios";

const Dashboard = () => {
  const [hornos, setHornos] = useState([]);

  //lamada al back para traer la lista de hornos existentes con sus datos
  const getOvens = async () => {
    axios.get("http://localhost:4000/dashboard/ovens").then((res) => {
        setHornos(res.data);
    });
  };

  //primer parametro: toda la función, segundo parametro: arreglo en blanco, corra cuando se cargue el componente
  useEffect(() => {
    const socket = io("http://localhost:4000");
    //cuando llegue nueva informacion se piden los hornos
    socket.on("newData", async () => {
      getOvens();
    });
    //se cargaron los hornos al inicio del componente
    getOvens();
  }, []);
  return (
    <div>
      <Hornos item={hornos} />
    </div>
  );
};

export default Dashboard;