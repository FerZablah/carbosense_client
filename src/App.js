import NuevoHorno from "./components/NuevoHorno";
import Hornos from "./components/Hornos";
import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";

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

const owgraf1 = {
  title: {
    useHTML: true,
    style: {
      color: "#FFFFFF",
      "background-color": "#5493C9",
      fontWeight: "bold",
    },
    text: "Temperatura promedio",
  },

  chart: {
    marginBottom: 110,
    marginLeft: 80,
    width: 500,
  },

  yAxis: {
    title: {
      text: "Temperatura",
    },
    categories: [
      "300°C",
      "350°C",
      "400°C",
      "450°C",
      "500°C",
      "550°C",
      "600°C",
      "650°C",
      "700°C",
    ],
  },
  xAxis: {
    title: {
      text: "Tiempo en horas",
    },
    categories: ["2", "3", "4", "5", "6", "7", "8"],
  },

  legend: {
    width: 400,
    floating: true,
    align: "left",
    x: 70, // = marginLeft - default spacingLeft
    itemWidth: 100,
    borderWidth: 1,
  },

  series: [
    {
      data: [1, 5, 7, 3, 6, 8],
      name: "Esperado",
      color: "#18354E",
      type: "area",
    },
    {
      data: [3, 7, 2, 1, 4, 5],
      name: "Real",
      color: "#FFDA0A",
    },
  ],
};

const owgraf2 = {
  title: {
    useHTML: true,
    style: {
      color: "#FFFFFF",
      "background-color": "#5493C9",
      fontWeight: "bold",
    },
    text: "Temperatura promedio del tanque de aceite",
  },

  chart: {
    marginBottom: 110,
    marginLeft: 80,
    width: 500,
  },

  yAxis: {
    title: {
      text: "Temperatura",
    },
    categories: ["40", "45", "50", "55", "60", "65", "70", "75"],
  },

  xAxis: {
    title: {
      text: "Tiempo en horas",
    },
    categories: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },

  legend: {
    width: 400,
    floating: true,
    align: "left",
    x: 70, // = marginLeft - default spacingLeft
    itemWidth: 100,
    borderWidth: 1,
  },

  series: [
    {
      data: [3, 6, 7, 4, 8],
      name: "Esperado",
      type: "area",
      color: "#18354E",
    },
    {
      data: [4, 9, 1, 6, 7],
      name: "Real",
      color: "#FFDA0A",
    },
  ],
};

const owgraf3 = {
  title: {
    useHTML: true,
    style: {
      color: "#FFFFFF",
      "background-color": "#5493C9",
      fontWeight: "bold",
    },
    text: "Porcentaje de carbono",
  },

  chart: {
    marginBottom: 110,
    marginLeft: 80,
    width: 500,
  },

  yAxis: {
    title: {
      text: "Porcentaje",
    },
    categories: ["40", "45", "50", "55", "60", "65", "70", "75"],
  },

  xAxis: {
    title: {
      text: "Tiempo en horas",
    },
    categories: ["1", "2", "3", "4", "5", "6", "7", "8"],
  },

  legend: {
    width: 400,
    floating: true,
    align: "left",
    x: 70, // = marginLeft - default spacingLeft
    itemWidth: 100,
    borderWidth: 1,
  },

  series: [
    {
      data: [3, 6, 7, 4, 8],
      name: "Esperado",
      type: "area",
      color: "#18354E",
    },
    {
      data: [4, 9, 1, 6, 7],
      name: "Real",
      color: "#FFDA0A",
    },
  ],
};

const App = () => {
  const [hornos, setHornos] = useState([]);
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
  //Codigo que se ejecuta al cargarse el componente
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("newData", async () => {
      axios.get("http://localhost:4000/dashboard/ovens").then((res) => {
        setHornos(res.data);
      });
    });
  }, []);
  //lo que se muestra en pantalla
  return (
    <div>
      <div className="w-100 p-2 bg-primary text-end text-white">@usuario</div>
      {/* boton de agregar horno */}
      <NuevoHorno onAddHorno={addHornoHandler} />
      {/* aqui se muestran los hornos registrados con los datos en tiempo real */}
      <Hornos item={hornos} />
      <Container>
        <Row>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={owgraf1} />
          </Col>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={owgraf2} />
          </Col>
        </Row>
        <Row>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={owgraf3} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
