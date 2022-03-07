import NuevoHorno from "./NuevoHorno";
import { useEffect, useState } from "react";
import Hornos from "./Hornos";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import axios from "axios";

const Dashboard = () => {
  const [hornos, setHornos] = useState([]);

  const getOvens = async () => {
    axios.get("http://localhost:4000/dashboard/ovens").then((res) => {
        setHornos(res.data);
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("newData", async () => {
      getOvens();
    });
    getOvens();
  }, []);
  return (
    <div>
      <Hornos item={hornos} />
    </div>
  );
};

export default Dashboard;
