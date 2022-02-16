import NuevoHorno from "./NuevoHorno";
import { useEffect, useState } from "react";
import Hornos from "./Hornos";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import axios from "axios";

const Dashboard = () => {
  const [hornos, setHornos] = useState([]);

  const addHornoHandler = (hornos) => {
    console.log(hornos);
    setHornos((prevHornos) => {
      return [hornos, ...prevHornos];
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("newData", async () => {
      axios.get("http://localhost:4000/dashboard/ovens").then((res) => {
        setHornos(res.data);
      });
    });
  }, []);
  return (
    <div>
      <div className="w-100 p-2 bg-primary text-end text-white">@usuario</div>
      <NuevoHorno onAddHorno={addHornoHandler} />
      <Hornos item={hornos} />
    </div>
  );
};

export default Dashboard;
