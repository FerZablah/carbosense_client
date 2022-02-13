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
  },
  xAxis: {
    title: {
      text: "Tiempo en horas",
    },
    categories: ["2", "3", "4", "5", "6", "7", "8"],
    plotBands:[{
      color: '#A2C4E2',
      from: 0,
      to: 1,
    },{
      color: '#73A6D3',
      from: 1,
      to: 2,
    },{
      color: '#4589C4',
      from: 2,
      to: 3,
    },{
      color: '#316A9B',
      from: 3,
      to: 4,
    },{
      color: '#224A6D',
      from: 4,
      to: 5,
    }],
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
      color: "#0E283D",
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
  },

  xAxis: {
    title: {
      text: "Tiempo en horas",
    },
    categories: ["1", "2", "3", "4", "5", "6", "7", "8"],
    plotBands:[{
      color: '#A2C4E2',
      from: 0,
      to: 1,
    },{
      color: '#73A6D3',
      from: 1,
      to: 2,
    },{
      color: '#4589C4',
      from: 2,
      to: 3,
    },{
      color: '#316A9B',
      from: 3,
      to: 4,
    },{
      color: '#224A6D',
      from: 4,
      to: 5,
    }],
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
      data: [3, 6, 7, 4, 8,6],
      name: "Esperado",
      type: "area",
      color: "#0E283D",
    },
    {
      data: [4, 9, 1, 6, 7,4],
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
  },

  xAxis: {
    title: {
      text: "Tiempo en horas",
    },
    categories: ["1", "2", "3", "4", "5", "6", "7", "8"],
    plotBands:[{
      color: '#A2C4E2',
      from: 0,
      to: 1,
    },{
      color: '#73A6D3',
      from: 1,
      to: 2,
    },{
      color: '#4589C4',
      from: 2,
      to: 3,
    },{
      color: '#316A9B',
      from: 3,
      to: 4,
    },{
      color: '#224A6D',
      from: 4,
      to: 5,
    }],
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
      data: [3, 6, 7, 4, 8,1],
      name: "Esperado",
      type: "area",
      color: "#0E283D",
    },
    {
      data: [4, 9, 1, 6, 7,3],
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
