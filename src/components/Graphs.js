import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";
import {
  mainCameraChartInitialOptions,
  modifySeriesToChart,
  setChartExpectedAndPlotBands
} from "../HighChartsUtils.js";
import DashboardChart from "./DashboardChart.js";

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

const parseDate = (dateString) => {
  return dateString ? moment(dateString, "YYYY-MM-DDTHH:mm:ss.SSSZ") : null;
}

const getDatesDuration = (start, end) => {
  let diff = end.diff(start);
  return moment.utc(diff).format("HH:mm:ss");
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Graphs = () => {
  const params = useParams();
  const [cycle, setCycle] = useState(null);
  const [plotBands, setPlotbands] = useState(null);
  const [realSeries, setRealSeries] = useState(null);
  const [expectedSeries, setExpectedSeries] = useState(null);
  const [maxLimitSeries, setMaxLimitSeries] = useState(null);
  const [minLimitSeries, setMinLimitSeries] = useState(null);
  const [exceededPhases, setExceededPhases] = useState(null);

  const [mainCameraChartOptions, setMainCameraChartOptions] = useState(modifySeriesToChart(mainCameraChartInitialOptions, []));
  const prevCycle = usePrevious(cycle);

  const getDashboardData = async () => {
    const res = await axios.get(`http://localhost:4000/dashboard/oven/${params.id}`);
    setCycle(res.data.cycle);
    //Only update the series if there exists data
    if(res.data.mainCamera) {
      setRealSeries(res.data.mainCamera)
      setExceededPhases(new Set(res.data.exceededPhases));    
    }
  }

  const getCycleInitialData = async (id) => {
    const res = await axios.get(`http://localhost:4000/dashboard/cycle/${id}/expected`);
    setExpectedSeries(res.data.mainCameraExpectedReadings);
    setMaxLimitSeries(res.data.mainCameraLimitReadings.max);
    setMinLimitSeries(res.data.mainCameraLimitReadings.min);
    setPlotbands(res.data.plotBands);
  }

  //Runs every time cycle value changes
  useEffect(() => {
    if((cycle && prevCycle === null) || (cycle && prevCycle !== null &&  cycle.id !== prevCycle.id)){
      //New cycle detected, update cycle initial data
      getCycleInitialData(cycle.id);
    }
  }, [cycle]);


  //Run when component has mounted
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("newData", async () => {
      getDashboardData();
    });
  }, []);

  //If no cycle detected show no current cycle
  if(!cycle) {
    return (
      <div>
      
        <Spinner className="center p-4" animation="border" role="status" />
        <h1 className="text-center p-4">No hay un ciclo actualmente para el horno {params.id}</h1>
      </div>
      );
  }
  return (
    <div>
      <Container className="w-75 p-3 fw-bold fs-1 bg-info text-center text-white rounded-pill mt-3">
        ID: {params.id}
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
            {parseDate(cycle.start).format("HH:mm:ss")}
          </Col>
          <Col className="text-black fs-1 fw-bold text-center mt-1">
            {cycle.end ? parseDate(cycle.end).format("HH:mm:ss") : '-'}
          </Col>
          <Col className="text-black fs-1 fw-bold text-center mt-1">
            {
              getDatesDuration(
                parseDate(cycle.start),
                (
                  cycle.end ? 
                    parseDate(cycle.end) :
                    moment()
                )
              )
          }
          </Col>
        </Row>
        <Row>
          <Col className="text-black fs-6 text-center mt-4">{parseDate(cycle.start).format("DD MMM YYYY")}</Col>
          <Col className="text-black fs-6 text-center mt-4">{cycle.end ? parseDate(cycle.start).format("DD MMM YYYY") : '-'}</Col>
          <Col className="text-black fs-6 text-center"></Col>
        </Row>
      </Container>
      <br></br>
      <Container>
        <Row>
          <Col>
            <DashboardChart
              plotBands={plotBands}
              realSeries={realSeries}
              expectedSeries={expectedSeries}
              maxLimitSeries={maxLimitSeries} 
              minLimitSeries={minLimitSeries}
              exceededPhases={exceededPhases}
              title={"Temperatura promedio de camara principal"}
            />
          </Col>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={owgraf2} />
          </Col>
        </Row>
        <Row>
          <Col>
            <HighchartsReact highcharts={Highcharts} options={owgraf3} />
          </Col>
          <Col>
          <HighchartsReact highcharts={Highcharts} options={mainCameraChartOptions} />
        </Col>
        </Row>
       
      </Container>
    </div>
  );
};

export default Graphs;
