import { useEffect, useState } from "react";
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
        color: "#86B8E3",
        from: 0,
        to: 1,
        label: {
          text: "Calentamiento", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#5C9FDA",
        from: 1,
        to: 2,
        label: {
          text: "Carburizado", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#3D78AA",
        from: 2,
        to: 3,
        label: {
          text: "Ecualización", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#28567E",
        from: 3,
        to: 4,
        label: {
          text: "Difusión", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#163E5F",
        from: 4,
        to: 5,
        label: {
          text: "Temple", // Content of the label.
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
    categories: ["1", "2", "3", "4", "5", "6", "7", "8"],
    plotBands: [
      {
        color: "#86B8E3",
        from: 0,
        to: 1,
        label: {
          text: "Calentamiento", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#5C9FDA",
        from: 1,
        to: 2,
        label: {
          text: "Carburizado", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#3D78AA",
        from: 2,
        to: 3,
        label: {
          text: "Ecualización", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#28567E",
        from: 3,
        to: 4,
        label: {
          text: "Difusión", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#163E5F",
        from: 4,
        to: 5,
        label: {
          text: "Temple", // Content of the label.
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
      data: [3, 6, 7, 4, 8, 6],
      name: "Esperado",
      type: "area",
      color: "#0E283D",
    },
    {
      data: [4, 9, 1, 6, 7, 4],
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
    width: 600,
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
    plotBands: [
      {
        color: "#86B8E3",
        from: 0,
        to: 1,
        label: {
          text: "Calentamiento", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#5C9FDA",
        from: 1,
        to: 2,
        label: {
          text: "Carburizado", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#3D78AA",
        from: 2,
        to: 3,
        label: {
          text: "Ecualización", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#28567E",
        from: 3,
        to: 4,
        label: {
          text: "Difusión", // Content of the label.
          align: "center", // Positioning of the label.
          style: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
        },
      },
      {
        color: "#163E5F",
        from: 4,
        to: 5,
        label: {
          text: "Temple", // Content of the label.
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
      data: [3, 6, 7, 4, 8, 1],
      name: "Esperado",
      type: "area",
      color: "#041C31",
    },
    {
      data: [4, 9, 1, 6, 7, 3],
      name: "Real",
      color: "#FFDA0A",
    },
  ],
};

const Graphs = () => {
  return (
    <div>
      <div className="w-100 p-2 bg-primary text-end text-white">@usuario</div>
      <Container className="w-75 p-3 fw-bold fs-1 bg-info text-center text-white rounded-pill mt-3">
        ID: 88
      </Container>
      <br></br>
      <Container className="bg-extra w-100 p-4 rounded">
        <Row>
          <Col className="text-black fs-6 text-center">Inicio del ciclo</Col>
          <Col className="text-black fs-6 text-center">Fin del ciclo</Col>
          <Col className="text-black fs-6 text-center">Duración del ciclo</Col>
        </Row>
        <Row>
          <Col className="text-black fs-1 fw-bold text-center mt-1">
            00:23:17
          </Col>
          <Col className="text-black fs-1 fw-bold text-center mt-1">
            00:00:47
          </Col>
          <Col className="text-black fs-1 fw-bold text-center mt-1">
            1:30:00
          </Col>
        </Row>
        <Row>
          <Col className="text-black fs-6 text-center mt-4">21 Junio 2020</Col>
          <Col className="text-black fs-6 text-center mt-4">22 Junio 2020</Col>
          <Col className="text-black fs-6 text-center"></Col>
        </Row>
      </Container>
      <br></br>
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

export default Graphs;
