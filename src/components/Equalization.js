import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import { Col, Container, Row } from "react-bootstrap";

const equalization1 = {
  title: {
    useHTML: true,
    style: {
      color: "#FFFFFF",
      "background-color": "#5493C9",
      fontWeight: "bold",
    },
    text: "Temperatura promedio de la cámara principal",
  },

  chart: {
    marginBottom: 110,
    marginLeft: 80,
    width: 600,
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
    plotBands: [
      {
        color: "#3D78AA",
        from: 0,
        to: 1,
        label: {
          text: "Ecualización", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
    ],
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
      data: [2, 3],
      name: "Esperado",
      color: "#0E283D",
      type: "area",
    },
    {
      data: [1, 2],
      name: "Real",
      color: "#FFDA0A",
    },
  ],

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
      data: [1, 2],
      name: "Esperado",
      color: "#0E283D",
      type: "area",
    },
    {
      data: [1, 4],
      name: "Real",
      color: "#FFDA0A",
    },
  ],
};

const Equalization = () => {
  return (
    <div>
            <Container className="w-75 p-3 fw-bold fs-1 bg-info text-center text-white rounded-pill mt-3">
        Etapa de Ecualización
      </Container>
      <br></br>
      <Container>
        <Row>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={equalization1} />
          </Col>
          <Col>
            <Container>
              <Row className="text-black fs-6 text-start mt-3">
                Fecha y hora inicio:
              </Row>
              <Row className="text-black fs-6 text-start mt-5">
                Fecha y hora fin:
              </Row>
              <Row className="text-black fs-6 text-start mt-5">
                Temperatura promedio:
              </Row>
              <Row className="text-black fs-6 text-start mt-5">
                Porcentaje de Carbono:
              </Row>
              <Row className="text-black fs-6 text-start mt-5">
                Duración de la etapa:
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Equalization;