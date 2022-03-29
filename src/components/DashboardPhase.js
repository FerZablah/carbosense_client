import axios from "axios";
import { now } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import translatePhase from "../phasesDisplay";
import DashboardChart from "./DashboardChart";

const DashboardPhase = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [phase, setPhase] = useState(null);
  const [avgTemperature, setAvgTemperature] = useState(null);
  const [avgCarbon, setAvgCarbon] = useState(null);

  const [temperatureRealSeries, setTemperatureRealSeries] = useState(null);
  const [mainCameraExpectedReadings, setMainCameraExpectedReadings] =
    useState(null);
  const [mainCameraLimitReadings, setMainCameraLimitReadings] = useState(null);

  const [carbonRealSeries, setCarbonRealSeries] = useState(null);
  const [carbonExpectedReadings, setCarbonExpectedReadings] = useState(null);
  const [carbonLimitReadings, setCarbonLimitReadings] = useState(null);

  const getDashboardData = async () => {
    const res = await axios.get(
      `http://localhost:4000/dashboard/oven/${params.horno}/phase/${params.fase}`
    );
    setPhase(res.data.phase);
    setAvgTemperature(res.data.avgTemperature);
    setAvgCarbon(res.data.avgCarbon);
    setTemperatureRealSeries(res.data.avgTemperatureReadings);
    setMainCameraExpectedReadings(res.data.mainCameraExpectedReadings);
    setMainCameraLimitReadings(res.data.mainCameraLimitReadings);
    setCarbonRealSeries(res.data.carbonReadings);
    setCarbonExpectedReadings(res.data.carbonExpectedReadings);
    setCarbonLimitReadings(res.data.carbonLimitReadings);
  };

  //Run when component has mounted
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("newData", async () => {
      getDashboardData();
    });
    getDashboardData();
    return () => {
      socket.disconnect();
    };
  }, []);

  if (!phase || !mainCameraLimitReadings || !carbonLimitReadings) {
    return null; //no se renderiza la pantalla
  }
  const phaseDuration = Math.abs(
    moment(phase.start).diff(phase.end ? moment(phase.end) : now(), "minutes")
  );
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(`/graficas/${params.horno}`)}>
          Horno {params.horno}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Fase de {translatePhase[params.fase]}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container className="w-25 p-3 fw-bold fs-3 bg-info text-center rounded-3 text-white mt-3">
        Etapa de {translatePhase[params.fase]}
      </Container>
      <br></br>
      <Container className="bg-extra w-75 p-5 rounded-3">
        <Row>
          <Col className="text-black fs-6 text-center">Fecha y hora inicio</Col>
          <Col className="text-black fs-6 text-center">Fecha y hora fin</Col>
          <Col className="text-black fs-6 text-center">
            Temperatura promedio
          </Col>
          <Col className="text-black fs-6 text-center">
            Porcentaje de carbono
          </Col>
          <Col className="text-black fs-6 text-center">
            Duración de la etapa
          </Col>
        </Row>
        <Row>
          {/* Fecha y hora inicio */}
          <Col md={2} className="text-black fs-5 text-center mt-3 ms-3 d-flex mx-auto">
            <span>
              <strong>
                {moment(phase.start).format("MMMM DD YYYY; hh:mm A")}
              </strong>
            </span>
          </Col>
          {/* Fecha y hora fin */}
          <Col md={2} className="text-black fs-5 text-center mt-3 ms-5 d-flex mx-auto">
            <span>
              <strong>
                {phase.end
                  ? moment(phase.end).format("MMMM DD YYYY; hh:mm A")
                  : "-"}
              </strong>
            </span>
          </Col>
          {/* Temperatura promedio */}
          <Col md={3} className="text-black fs-4 text-center mt-3 mx-auto">
            <span>
              <strong>{avgTemperature} °C</strong>
            </span>
          </Col>
          {/* Porcentaje de carbono */}
          <Col md={2} className="text-black fs-4 text-center mt-3 d-flex mx-auto">
            <span>
              <strong>{avgCarbon} %</strong>
            </span>
          </Col>
          {/* Duración de la etapa */}
          <Col md={2} className="text-black fs-4 text-center mt-3 d-flex mx-auto">
            <span>
              <strong>{phaseDuration} minutos</strong>
            </span>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <DashboardChart
              realSeries={temperatureRealSeries}
              expectedPlotBands={[]}
              realPlotBands={[]}
              title="Temperatura camára principal"
              exceededPhases={new Set()}
              expectedSeries={mainCameraExpectedReadings}
              maxLimitSeries={mainCameraLimitReadings.max}
              minLimitSeries={mainCameraLimitReadings.min}
              yAxisTitle={"Temperatura °C"}
              yAxisMin={0}
              toolTipSuffix={"°C"}
              yAxisMax={1200}
              ovenId={params.id}
            />
            {/* <DashboardChart
              realSeries={carbonRealSeries}
              expectedPlotBands={[]}
              realPlotBands={[]}
              title="Porcentaje de carbono"
              exceededPhases={new Set()}
              expectedSeries={carbonExpectedReadings}
              maxLimitSeries={carbonLimitReadings.max}
              minLimitSeries={carbonLimitReadings.min}
              yAxisTitle={"Porcentaje carbono %"}
              yAxisMin={0}
              toolTipSuffix={"%"}
              yAxisMax={3}
              ovenId={params.id}
            /> */}
          </Col>
          <Col>
          <DashboardChart
              realSeries={carbonRealSeries}
              expectedPlotBands={[]}
              realPlotBands={[]}
              title="Porcentaje de carbono"
              exceededPhases={new Set()}
              expectedSeries={carbonExpectedReadings}
              maxLimitSeries={carbonLimitReadings.max}
              minLimitSeries={carbonLimitReadings.min}
              yAxisTitle={"Porcentaje carbono %"}
              yAxisMin={0}
              toolTipSuffix={"%"}
              yAxisMax={3}
              ovenId={params.id}
            />
            {/* <Container>
              <Row className="text-black fs-4 text-start mt-3">
                <span>
                  Fecha y hora inicio:{" "}
                  <strong>
                    {moment(phase.start).format("MMMM DD YYYY; hh:mm A")}
                  </strong>
                </span>
              </Row>
              <Row className="text-black fs-4 text-start mt-5">
                <span>
                  Fecha y hora fin:{" "}
                  <strong>
                    {phase.end
                      ? moment(phase.end).format("MMMM DD YYYY; hh:mm A")
                      : "-"}
                  </strong>
                </span>
              </Row>
              <Row className="text-black fs-4 text-start mt-5">
                <span>
                  {" "}
                  Temperatura promedio: <strong>{avgTemperature} °C</strong>
                </span>
              </Row>
              <Row className="text-black fs-4 text-start mt-5">
                <span>
                  Porcentaje promedio de carbono: <strong>{avgCarbon} %</strong>
                </span>
              </Row>
              <Row className="text-black fs-4 text-start mt-5">
                <span>
                  Duración de la etapa: <strong>{phaseDuration} minutos</strong>
                </span>
              </Row>
            </Container> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardPhase;
