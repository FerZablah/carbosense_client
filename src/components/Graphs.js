/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Breadcrumb, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";
import DashboardChart from "./DashboardChart.js";

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
  const navigate = useNavigate();

  const [cycle, setCycle] = useState(null);
  const [realPlotBands, setRealPlotBands] = useState(null);
  const [expectedPlotBands, setExpectedPlotBands] = useState(null);

  //Main camera temperature hooks
  const [realMainSeries, setRealMainSeries] = useState(null);
  const [expectedMainSeries, setExpectedMainSeries] = useState(null);
  const [maxMainLimitSeries, setMaxMainLimitSeries] = useState(null);
  const [minMainLimitSeries, setMinMainLimitSeries] = useState(null);
  const [mainTempExceededPhases, setMainTempExceededPhases] = useState(new Set());

  //Oxygen percentage hooks
  const [realOxygenSeries, setRealOxygenSeries] = useState(null);
  const [expectedOxygenSeries, setExpectedOxygenSeries] = useState(null);
  const [maxOxygenLimitSeries, setMaxOxygenLimitSeries] = useState(null);
  const [minOxygenLimitSeries, setMinOxygenLimitSeries] = useState(null);
  const [oxygenExceededPhases, setOxygenExceededPhases] = useState(new Set());

  //Temple camera hooks
  const [realTempleSeries, setRealTempleSeries] = useState(null);
  const [expectedTempleSeries, setExpectedTempleSeries] = useState(null);
  const [templePlotBand, setTemplePlotBand] = useState([]);
  const [maxTempleLimitSeries, setMaxTempleLimitSeries] = useState(null);
  const [minTempleLimitSeries, setMinTempleLimitSeries] = useState(null);
  const [templeExceeded, setTempleExceeded] = useState(false);

  const prevCycle = usePrevious(cycle);

  const getDashboardData = async () => {
    const res = await axios.get(`http://localhost:4000/dashboard/oven/${params.id}`);
    setCycle(res.data.cycle);
    //Only update the series if there exists data
    if (res.data.mainCamera) {
      setRealMainSeries(res.data.mainCamera);
      setRealOxygenSeries(res.data.oxygenReadings);
      setRealTempleSeries(res.data.templeCamera);
      setRealPlotBands(res.data.realPlotBands);
      setMainTempExceededPhases(new Set(res.data.mainTempExceededPhases));
      setOxygenExceededPhases(new Set(res.data.oxygenExceededPhases));
      setTemplePlotBand(res.data.templePlotBand ? [res.data.templePlotBand] : []);
      setTempleExceeded(res.data.templeExceeded);
    }
  }

  const getCycleInitialData = async (id) => {
    const res = await axios.get(`http://localhost:4000/dashboard/cycle/${id}/expected`);
    //Set series for main camera
    setExpectedMainSeries(res.data.mainCameraExpectedReadings);
    setMaxMainLimitSeries(res.data.mainCameraLimitReadings.max);
    setMinMainLimitSeries(res.data.mainCameraLimitReadings.min);

    //Set series for oxygen percentage
    setExpectedOxygenSeries(res.data.oxygenExpectedReadings);
    setMaxOxygenLimitSeries(res.data.oxygenLimitReadings.max);
    setMinOxygenLimitSeries(res.data.oxygenLimitReadings.min);

    //Set series for temple camera
    setExpectedTempleSeries(res.data.templeCameraExpectedReadings);
    if(res.data.templeCameraLimitReadings){
      setMaxTempleLimitSeries(res.data.templeCameraLimitReadings.max);
      setMinTempleLimitSeries(res.data.templeCameraLimitReadings.min);
    }

    setExpectedPlotBands(res.data.expectedPlotBands);
  }

  //Runs every time cycle value changes
  useEffect(() => {
    if ((cycle && prevCycle === null) || (cycle && prevCycle !== null && cycle.id !== prevCycle.id)) {
      //New cycle detected, update cycle initial data
      getCycleInitialData(cycle.id);
    }

    if ((cycle && prevCycle && cycle.id === prevCycle.id && cycle.end !== prevCycle.end)) {
      //End on cycle detected, update cycle initial data
      getCycleInitialData(cycle.id);
    }

  }, [cycle, prevCycle]);

  //Run when component has mounted
  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("newData", async () => {
      getDashboardData();
    });
    getDashboardData();

    return () => {
      socket.disconnect();
    }
  }, []);

  //If no cycle detected show no current cycle
  if (!cycle) {
    return (
      <div>
        <Breadcrumb className="p-3">
          <Breadcrumb.Item onClick={() => navigate(`/`)}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item active>
            Horno {params.id}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Spinner className="center p-4" animation="border" role="status" />
        <h1 className="text-center p-4">No hay un ciclo actualmente para el horno {params.id}</h1>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item onClick={() => navigate(`/`)}>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Horno {params.id}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Container className="w-25 p-1 fs-3 bg-info text-center text-white rounded-3 mt-3">
        ID Horno: <strong>{params.id}</strong>
      </Container>
      <br></br>
      <Container className="bg-extra w-50 p-3 rounded-3">
        <Row>
          <Col className="text-black fs-5 text-center">Inicio del ciclo</Col>
          <Col className="text-black fs-5 text-center">Fin del ciclo</Col>
          <Col className="text-black fs-5 text-center">Duración del ciclo</Col>
        </Row>
        <Row>
          <Col className="text-black fs-3 fw-bold text-center">
            {parseDate(cycle.start).format("HH:mm:ss")}
          </Col>
          <Col className="text-black fs-3 fw-bold text-center">
            {cycle.end ? parseDate(cycle.end).format("HH:mm:ss") : '-'}
          </Col>
          <Col className="text-black fs-3 fw-bold text-center">
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
          <Col className="text-black fs-6 text-center">{parseDate(cycle.start).format("DD MMM YYYY")}</Col>
          <Col className="text-black fs-6 text-center">{cycle.end ? parseDate(cycle.start).format("DD MMM YYYY") : '-'}</Col>
          <Col className="text-black fs-6 text-center"></Col>
        </Row>
      </Container>
      <div className="p-3">
        <Row className="justify-content-around">
          <Col md={6} className="rounded-3">
            <DashboardChart
              showPlotbandsButton
              realPlotBands={realPlotBands}
              expectedPlotBands={expectedPlotBands}
              realSeries={realMainSeries}
              exceededPhases={mainTempExceededPhases}
              expectedSeries={expectedMainSeries}
              maxLimitSeries={maxMainLimitSeries}
              minLimitSeries={minMainLimitSeries}
              title={"Temperatura cámara principal"}
              yAxisTitle={"Temperatura °C"}
              yAxisMin={0}
              toolTipSuffix={"°C"}
              yAxisMax={1200}
              ovenId={params.id}
            />
          </Col>
          <Col md={6} className="rounded-3">
            <DashboardChart
              showPlotbandsButton
              realPlotBands={realPlotBands}
              expectedPlotBands={expectedPlotBands}
              exceededPhases={oxygenExceededPhases}
              realSeries={realOxygenSeries}
              expectedSeries={expectedOxygenSeries}
              maxLimitSeries={maxOxygenLimitSeries}
              minLimitSeries={minOxygenLimitSeries}
              title={"Porcentaje de oxígeno"}
              yAxisTitle={"Porcentaje Oxígeno%"}
              toolTipSuffix={"%"}
              yAxisMax={3}
              yAxisMin={0}
              ovenId={params.id}
            />
          </Col>
          
          <Col md={6}  className="rounded-3">
          {realTempleSeries && realTempleSeries.length > 0 && 
              <DashboardChart
                realPlotBands={templePlotBand}
                expectedPlotBands={[]}
                realSeries={realTempleSeries}
                exceededPhases={new Set((templeExceeded ? ['Temple'] : []))}
                expectedSeries={expectedTempleSeries}
                maxLimitSeries={maxTempleLimitSeries}
                minLimitSeries={minTempleLimitSeries}
                title={"Temperatura cámara de temple"}
                yAxisTitle={"Temperatura °C"}
                toolTipSuffix={"°C"}
                yAxisMax={90}
                yAxisMin={20}
                ovenId={params.id}
              />
          }
          </Col>
        </Row>
        </div>
    </div>
  );
};

export default Graphs;
