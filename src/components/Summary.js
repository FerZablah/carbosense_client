import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Breadcrumb } from "react-bootstrap";
import { BsDownload, } from "react-icons/bs";
import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";
import {AiFillCloseCircle} from "react-icons/ai";

import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DashboardChart from "./DashboardChart";
import {writeFile, utils} from 'xlsx';

const Summary = () => {
  const getValueColor = (value) => {
    if (value > 0 && value < 5) {
      return "green";
    } else if (value > 5 && value < 10) {
      return "orange";
    }
    else {
      return "red";
    }
  }
  let navigate = useNavigate();
  let params = useParams();
  const [cycle, setCycle] = useState(null);
  const [mainCameraData, setMainCameraData] = useState(null);
  const [carbonData, setCarbonData] = useState(null);
  const [expectedPlotBands, setExpectedPlotBands] = useState(null);
  const [realPlotBands, setRealPlotBands] = useState(null);
  const [phasesData, setPhasesData] = useState(null);
  const [templeData, setTempleData] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const getCycle = useCallback(async () => {
    //get cycle
    const res = await axios.get(`http://localhost:4000/report/${params.ciclo}`);
    setCycle(res.data.cycle);
    setCarbonData({
      expectedReadings: res.data.expectedData.oxygenExpectedReadings,
      limitReadings: res.data.expectedData.oxygenLimitReadings,
      realReadings: res.data.realData.oxygenReadings,
      exceededPhases: new Set(res.data.realData.oxygenExceededPhases)
    })
    setMainCameraData({
      expectedReadings: res.data.expectedData.mainCameraExpectedReadings,
      limitReadings: res.data.expectedData.templeCameraLimitReadings,
      realReadings: res.data.realData.mainCamera,
      exceededPhases: new Set(res.data.realData.mainTempExceededPhases)
    })
    setTempleData({
      expectedReadings: res.data.expectedData.templeCameraExpectedReadings,
      limitReadings: res.data.expectedData.templeCameraLimitReadings,
      realReadings: res.data.realData.templeCamera,
      exceeded: res.data.realData.templeExceeded,
      plotBands: [res.data.realData.templePlotBand]
    })
    setExpectedPlotBands(res.data.expectedData.expectedPlotBands)
    setRealPlotBands(res.data.realData.realPlotBands)
    setPhasesData(res.data.phasesData);
  }, [params.ciclo])

  const downloadExcel = () => {
    const summarySheet = utils.json_to_sheet([{
      "Ciclo": cycle.id,
      "Fecha de inicio": moment(cycle.start).format("HH:mm:ss"),
      "Fecha de fin": moment(cycle.end).format("HH:mm:ss"),
      "Duración": cycle.duration,
      "Tipo de ciclo": cycle.type,
      "No. Pieza": 768
    }]);
    const tempConditionSheet = utils.json_to_sheet([{
      "Parámetros Horno": "Temperatura Aceite (°C)",
      "Esperado": phasesData['templeCamera'].expectedTemp,
      "Real": phasesData['templeCamera'].avgTemperature,
      "Desviación":phasesData['templeCamera'].tempDeviation
    }, {
      "Parámetros Horno": "Temperatura Carburizado (°C)",
      "Esperado": phasesData['carburizado'].expectedTemp,
      "Real": phasesData['carburizado'].avgTemperature,
      "Desviación":phasesData['carburizado'].tempDeviation
    }, {
      "Parámetros Horno": "Temperatura Difusión (°C)",
      "Esperado": phasesData['difusion'].expectedTemp,
      "Real": phasesData['difusion'].avgTemperature,
      "Desviación":phasesData['difusion'].tempDeviation
    }, {
      "Parámetros Horno": "Temperatura Ecualización (°C)",
      "Esperado": phasesData['ecualization'].expectedTemp,
      "Real": phasesData['ecualization'].avgTemperature,
      "Desviación":phasesData['ecualization'].tempDeviation
    }]);

    const carbonConditionSheet = utils.json_to_sheet([{
      "Parámetros Horno": "% Carbono Carburizado",
      "Esperado": phasesData['carburizado'].expectedCarbon,
      "Real": phasesData['carburizado'].avgCarbon,
      "Desviación":phasesData['carburizado'].carbonDeviation
    }, {
      "Parámetros Horno": "% Carbono Difusión",
      "Esperado": phasesData['difusion'].expectedCarbon,
      "Real": phasesData['difusion'].avgCarbon,
      "Desviación":phasesData['difusion'].carbonDeviation
    }, {
      "Parámetros Horno": "% Carbono Ecualización",
      "Esperado": phasesData['ecualization'].expectedCarbon,
      "Real": phasesData['ecualization'].avgCarbon,
      "Desviación":phasesData['ecualization'].carbonDeviation
    }]);
    const mainTempReadings = mainCameraData.realReadings.map(reading => {
      return [moment(reading[0]).format("YYYY-MM-DD HH:mm:ss"), reading[1]]
    })
    const mainTempRealDataSheet = utils.aoa_to_sheet(mainTempReadings); //aoa en vez de json; es una matriz
    const carbonReadings = carbonData.realReadings.map(reading => {
      return [moment(reading[0]).format("YYYY-MM-DD HH:mm:ss"), reading[1]]
    })
    const carbonRealDataSheet = utils.aoa_to_sheet(carbonReadings);

    const templeReadings = templeData.realReadings.map(reading => {
      return [moment(reading[0]).format("YYYY-MM-DD HH:mm:ss"), reading[1]]
    })
    const templeRealDataSheet = utils.aoa_to_sheet(templeReadings);

    var new_workbook = utils.book_new();
    utils.book_append_sheet(new_workbook, summarySheet, "Resumen")
    utils.book_append_sheet(new_workbook, tempConditionSheet, "Condiciones Temperatura")
    utils.book_append_sheet(new_workbook, carbonConditionSheet, "Condiciones Carbono")
    utils.book_append_sheet(new_workbook, mainTempRealDataSheet, "Temperatura Cámara Principal")
    utils.book_append_sheet(new_workbook, carbonRealDataSheet, "%Carbono Cámara Principal")
    utils.book_append_sheet(new_workbook, templeRealDataSheet, "Temperatura Cámara Temple")

    writeFile(new_workbook, "Ciclo.xlsx");
    setShowDownloadButton(false)
  }
  //On Load
  useEffect(() => {
    getCycle();
    
  }, [getCycle]);
  if (!cycle || !carbonData || !expectedPlotBands || !realPlotBands || !mainCameraData || !phasesData || !templeData) return null;
  console.log(templeData);
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item onClick={() => navigate(`/reportes`)}>Reportes</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Ciclo {params.ciclo}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Container>
        <div className="d-flex flex-row justify-content-center align-items-center w-100 position-relative" >
          <span className="fw-bold fs-4 text-center">Resumen del ciclo</span>
          <div role="button" onClick={() => setShowDownloadButton(!showDownloadButton)} className="position-absolute top-0 end-0 d-flex justify-content-around bg-primary text-white p-1 rounded-3 align-items-center" style={{width: 120}}>
            <span>Descargar</span>  
            <BsDownload size="20" />
          </div>
          {showDownloadButton &&
            <div style={{ position: 'absolute', top: 0, right: 0 }}>
              <div className="d-flex justify-content-end text-black rounded-3 hoverable" onClick={() => setShowDownloadButton(!showDownloadButton)}>
                <AiFillCloseCircle size="25" className="mx-2 bg-white rounded-pill"/>
              </div>
              <div className="d-flex justify-content-between bg-primary text-white p-2 m-2 rounded-3 hoverable">
                <span>Descargar CSV</span>
                <FaFileCsv size="25" className="mx-2" />
              </div>
              <div className="d-flex justify-content-between bg-primary text-white p-2 m-2 rounded-3 hoverable" onClick={downloadExcel}>
                <span>Descargar Excel</span>
                <FaFileExcel size="25" className="mx-2" />
              </div>
              <div className="d-flex justify-content-between bg-primary text-white p-2 m-2 rounded-3 hoverable">
                <span>Descargar PDF</span>
                <FaFilePdf size="25" className="mx-2" />
              </div>
            </div>
          }
        </div>
      </Container>
      <Container className="bg-extra m-3 p-4 w-75 rounded text-center mx-auto">
        <Row>
          <Col className="fw-bold fs-5 text-body">ID Horno:88</Col>
        </Row>
        <Row className="mt-2 justify-content-center text-center">
          <Col md={2} className="fs-6">Inicio del ciclo</Col>
          <Col md={2} className="fs-6">Fin del ciclo</Col>
          <Col md={2} className="fs-6">Duración del ciclo</Col>
          <Col md={2} className="fs-6">Tipo de ciclo</Col>
          <Col md={2} className="fs-6">Pieza</Col>
        </Row>
        <Row className="mt-2 justify-content-center text-center">
          <Col md={2} className="fs-5 fw-bold">{moment(cycle.start).format("HH:mm:ss")}</Col>
          <Col md={2} className="fs-5 fw-bold">{cycle.end ? moment(cycle.end).format("HH:mm:ss") : '-'}</Col>
          <Col md={2} className="fs-5 fw-bold">{cycle.duration ? cycle.duration : '-'}</Col>
          <Col md={2} className="fs-5 fw-bold">{cycle.type}</Col>
          <Col md={2} className="fs-5 fw-bold">768</Col>
        </Row>
        <Row className="mt-2 justify-content-center text-center">
          <Col md={2}>{moment(cycle.start).format("DD MMM YYYY")}</Col>
          <Col md={2}>{cycle.end ? moment(cycle.end).format("DD MMM YYYY") : '-'}</Col>
          <Col md={2} />
          <Col md={2} />
          <Col md={2} />
        </Row>
      </Container>
      <Container>

        <Row className="mt-5">
          <Col >
            <DashboardChart
              showPlotbandsButton
              realPlotBands={realPlotBands}
              expectedPlotBands={expectedPlotBands}
              exceededPhases={mainCameraData.exceededPhases}
              realSeries={mainCameraData.realReadings}
              expectedSeries={mainCameraData.expectedReadings}
              maxLimitSeries={mainCameraData.limitReadings.max}
              minLimitSeries={mainCameraData.limitReadings.min}
              title={"Temperatura cámara principal"}
              yAxisTitle={"Temperatura °C"}
              toolTipSuffix={"°C"}
              yAxisMax={1200}
              yAxisMin={0}
              ovenId={params.ciclo}
              onPlotBandClick={(plotBand) => {


                navigate(`/reportes/ciclo/${params.ciclo}/fase/${plotBand}`, { replace: true })
              }}
            />

            <span className="fw-bold fs-4 text-body text-center">Condiciones temperatura</span>
          </Col>
          <Col >
            <DashboardChart
              showPlotbandsButton
              realPlotBands={realPlotBands}
              expectedPlotBands={expectedPlotBands}
              exceededPhases={carbonData.exceededPhases}
              realSeries={carbonData.realReadings}
              expectedSeries={carbonData.expectedReadings}
              maxLimitSeries={carbonData.limitReadings.max}
              minLimitSeries={carbonData.limitReadings.min}
              title={"Porcentaje de carbono"}
              yAxisTitle={"Porcentaje carbono%"}
              toolTipSuffix={"%"}
              yAxisMax={5}
              yAxisMin={0}
              ovenId={params.ciclo}
              onPlotBandClick={(plotBand) => {
                navigate(`/reportes/ciclo/${params.ciclo}/fase/${plotBand}`, { replace: true })
              }}
            />
            <span className="fw-bold fs-4 text-body text-center">Condiciones carbono</span>
          </Col>
        </Row>
        <Row>

          <Col>
            <Table striped bordered hover size="sm" className="mt-4">
              <thead>
                <tr>
                  <th className="text-center fs-6">Parámetros Horno</th>
                  <th className="text-center fs-6">Esperado</th>
                  <th className="text-center fs-6">Real</th>
                  <th className="text-center fs-6">Desviación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">Temperatura Aceite (°C)</td>
                  <td className="fs-6 text-center" >{phasesData['templeCamera'].expectedTemp}°C</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['templeCamera'].avgTemperature}°C</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['templeCamera'].tempDeviation) }}>{phasesData['templeCamera'].tempDeviation}%</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">
                    Temperatura Carburizado (°C)
                  </td>
                  <td className="fs-6 text-center">{phasesData['carburizado'].expectedTemp}°C</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['carburizado'].avgTemperature}°C</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['carburizado'].tempDeviation) }}>{phasesData['carburizado'].tempDeviation}%</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">Temperatura Difusión (°C)</td>
                  <td className="fs-6 text-center">{phasesData['difusion'].expectedTemp}°C</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['difusion'].avgTemperature}°C</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['difusion'].tempDeviation) }}>{phasesData['difusion'].tempDeviation}%</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">Temperatura Ecualización (°C)</td>
                  <td className="fs-6 text-center">{phasesData['ecualization'].expectedTemp}°C</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['ecualization'].avgTemperature}°C</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['ecualization'].tempDeviation) }}>{phasesData['ecualization'].tempDeviation}%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table striped bordered hover size="sm" className="mt-4">
              <thead>
                <tr>
                  <th className="text-center fs-6">Parámetros Horno</th>
                  <th className="text-center fs-6">Esperado</th>
                  <th className="text-center fs-6">Real</th>
                  <th className="text-center fs-6">Desviación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">% Carbono Carburizado</td>
                  <td className="fs-6 text-center">{phasesData['carburizado'].expectedCarbon}%</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['carburizado'].avgCarbon}%</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['carburizado'].carbonDeviation) }}>{phasesData['carburizado'].carbonDeviation}%</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">% Carbono Difusión</td>
                  <td className="fs-6 text-center">{phasesData['difusion'].expectedCarbon}%</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['difusion'].avgCarbon}%</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['difusion'].carbonDeviation) }}>{phasesData['difusion'].carbonDeviation}%</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">% Carbono Ecualización</td>
                  <td className="fs-6 text-center">{phasesData['ecualization'].expectedCarbon}%</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['ecualization'].avgCarbon}%</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['ecualization'].carbonDeviation) }}>{phasesData['ecualization'].carbonDeviation}%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col >
            <DashboardChart
              realPlotBands={templeData.plotBands}
              expectedPlotBands={[]}
              realSeries={templeData.realReadings}
              exceededPhases={new Set((templeData.exceeded ? ['Temple'] : []))}
              expectedSeries={templeData.expectedReadings}
              maxLimitSeries={templeData.limitReadings.max}
              minLimitSeries={templeData.limitReadings.min}
              title={"Temperatura cámara de temple"}
              yAxisTitle={"Temperatura °C"}
              toolTipSuffix={"°C"}
              yAxisMax={90}
              yAxisMin={20}
              ovenId={params.id}
              onPlotBandClick={(plotBand) => {
                navigate(`/reportes/ciclo/${params.ciclo}/fase/${plotBand}`, { replace: true })
              }}
            />
            <span className="fw-bold fs-4 text-body text-center">Condiciones carbono</span>
          </Col>
        </Row>
        <Row>

          <Col>
            <Table striped bordered hover size="sm" className="mt-4">
              <thead>
                <tr>
                  <th className="text-center fs-6">Parámetros Horno</th>
                  <th className="text-center fs-6">Esperado</th>
                  <th className="text-center fs-6">Real</th>
                  <th className="text-center fs-6">Desviación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fs-6 text-center">Temperatura Aceite (°C)</td>
                  <td className="fs-6 text-center" >{phasesData['templeCamera'].expectedTemp}°C</td>
                  <td className="fs-6 text-center fw-bold">{phasesData['templeCamera'].avgTemperature}°C</td>
                  <td className="fs-6 text-center fw-bold" style={{ color: getValueColor(phasesData['templeCamera'].tempDeviation) }}>{phasesData['templeCamera'].tempDeviation}%</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Summary;
