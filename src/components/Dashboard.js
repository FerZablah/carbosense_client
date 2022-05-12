import NuevoHorno from "./NuevoHorno";
import { useEffect, useState } from "react";
import Hornos from "./Ovens";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import axios from "axios";
import { BASE_URL, isDev, SOCKET_BASE_URL } from "../utils";

const Dashboard = () => {
    const [hornos, setHornos] = useState([]);

    //lamada al back para traer la lista de hornos existentes con sus datos
    const getOvens = async () => {
        axios.get(`${BASE_URL}/dashboard/ovens`).then((res) => {
            setHornos(res.data);
        });
    };

    //primer parametro: toda la función, segundo parametro: arreglo en blanco, corra cuando se cargue el componente
    useEffect(() => {
        let socket;
        if (isDev) {
            socket = io(`${SOCKET_BASE_URL}`);
        }
        else {
            socket = io(`${SOCKET_BASE_URL}`, {
                path: '/api/socket.io/'
            });
        }
        //cuando llegue nueva informacion se piden los hornos
        socket.on("newData", async () => {
            getOvens();
        });
        //se cargaron los hornos al inicio del componente
        getOvens();

        return () => {
            socket.disconnect();
        }
    }, []);
    return (
        <div>
            <Hornos item={hornos} />
        </div>
    );
};

export default Dashboard;
