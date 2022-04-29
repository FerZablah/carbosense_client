import React, { useCallback, useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Breadcrumb,
} from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import { FaFileCsv, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DashboardChart from "./DashboardChart";
import { writeFile, utils } from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { BASE_URL } from "../utils";


const Summary = () => {
    const getValueColor = (value) => {
        if (value > 0 && value < 5) {
            return "green";
        } else if (value > 5 && value < 10) {
            return "orange";
        } else {
            return "red";
        }
    };
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
    const [observations, setObservations] = useState('');
    const [disposition, setDisposition] = useState(false);
    const [analyzer, setAnalyzer] = useState(null);
    const [authorizer, setAuthorizer] = useState(null);
    const [operator, setOperator] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [vistoBueno, setVistoBueno] = useState(false);
    const [report, setReport] = useState(null);
    const getCycle = useCallback(async () => {
        //get cycle
        const res = await axios.get(
            `${BASE_URL}/report/${params.ciclo}`
        );
        setCycle(res.data.cycle);
        setCarbonData({
            expectedReadings: res.data.expectedData.oxygenExpectedReadings,
            limitReadings: res.data.expectedData.oxygenLimitReadings,
            realReadings: res.data.realData.oxygenReadings,
            exceededPhases: new Set(res.data.realData.oxygenExceededPhases),
        });
        setMainCameraData({
            expectedReadings: res.data.expectedData.mainCameraExpectedReadings,
            limitReadings: res.data.expectedData.mainCameraLimitReadings,
            realReadings: res.data.realData.mainCamera,
            exceededPhases: new Set(res.data.realData.mainTempExceededPhases),
        });
        setTempleData({
            expectedReadings:
                res.data.expectedData.templeCameraExpectedReadings,
            limitReadings: res.data.expectedData.templeCameraLimitReadings,
            realReadings: res.data.realData.templeCamera,
            exceeded: res.data.realData.templeExceeded,
            plotBands: [res.data.realData.templePlotBand],
        });
        setExpectedPlotBands(res.data.expectedData.expectedPlotBands);
        setRealPlotBands(res.data.realData.realPlotBands);
        setPhasesData(res.data.phasesData);
    }, [params.ciclo]);

    const getReport = useCallback(async () => {
        const res = await axios.get(
            `${BASE_URL}/metallurgy/${params.ciclo}`
        );
        const operatorFieldsRes = await axios.get(
            `${BASE_URL}/metallurgy/operator/${params.ciclo}`
        );
        const data = res.data.fields.filter(
            (section) =>
                !["Observaciones", "Disposición"].includes(section.section)
        );
        if (operatorFieldsRes.data.fields.length > 0) {
            data.find(section => section.section === "Análisis Químico").fields.push(...operatorFieldsRes.data.fields[0].fields);
        }
        const registeredObservations = res.data.fields.find((section) =>
            section.fields.find((field) => field.name === "Observaciones")
        );
        if (
            registeredObservations &&
            registeredObservations.fields &&
            registeredObservations.fields.length > 0 &&
            registeredObservations.fields[0].real
        ) {
            setObservations(registeredObservations.fields[0].real.real);
        }
        if (
            res.data.disposition !== undefined &&
            res.data.disposition !== null
        ) {
            setDisposition(res.data.disposition);
        }
        if (res.data.analyzer !== undefined && res.data.analyzer !== null && res.data.analyzer.id) {
            setAnalyzer(res.data.analyzer);
        }
        if (res.data.operator !== undefined && res.data.operator !== null && res.data.operator.id) {
            setOperator(res.data.operator);
        }
        if (
            res.data.authorizer !== undefined &&
            res.data.authorizer !== null &&
            res.data.authorizer.id !== null
        ) {
            setAuthorized(true);
            setVistoBueno(true);
            setAuthorizer(res.data.authorizer);
        }
        setReport(data);
        setCycle(res.data.cycle);
    }, [params.ciclo]);
    const downloadCSV = () => {
        setShowDownloadButton(false);

        axios({
            url: `${BASE_URL}/report/${params.ciclo}/csv`,
            method: "GET",
            responseType: "blob", // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reportes.zip");
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadExcel = () => {
        const summarySheet = utils.json_to_sheet([
            {
                Ciclo: cycle.id,
                "Fecha de inicio": moment(cycle.start).format("HH:mm:ss"),
                "Fecha de fin": moment(cycle.end).format("HH:mm:ss"),
                Duración: cycle.duration,
                "Tipo de ciclo": cycle.type,
                "No. Pieza": 999,
            },
        ]);
        const tempConditionSheet = utils.json_to_sheet([
            {
                "Parámetros Horno": "Temperatura Aceite (°C)",
                Esperado: phasesData["templeCamera"].expectedTemp,
                Real: phasesData["templeCamera"].avgTemperature,
                Desviación: phasesData["templeCamera"].tempDeviation,
            },
            {
                "Parámetros Horno": "Temperatura Carburizado (°C)",
                Esperado: phasesData["carburizado"].expectedTemp,
                Real: phasesData["carburizado"].avgTemperature,
                Desviación: phasesData["carburizado"].tempDeviation,
            },
            {
                "Parámetros Horno": "Temperatura Difusión (°C)",
                Esperado: phasesData["difusion"].expectedTemp,
                Real: phasesData["difusion"].avgTemperature,
                Desviación: phasesData["difusion"].tempDeviation,
            },
            {
                "Parámetros Horno": "Temperatura Ecualización (°C)",
                Esperado: phasesData["ecualization"].expectedTemp,
                Real: phasesData["ecualization"].avgTemperature,
                Desviación: phasesData["ecualization"].tempDeviation,
            },
        ]);

        const carbonConditionSheet = utils.json_to_sheet([
            {
                "Parámetros Horno": "% Carbono Carburizado",
                Esperado: phasesData["carburizado"].expectedCarbon,
                Real: phasesData["carburizado"].avgCarbon,
                Desviación: phasesData["carburizado"].carbonDeviation,
            },
            {
                "Parámetros Horno": "% Carbono Difusión",
                Esperado: phasesData["difusion"].expectedCarbon,
                Real: phasesData["difusion"].avgCarbon,
                Desviación: phasesData["difusion"].carbonDeviation,
            },
            {
                "Parámetros Horno": "% Carbono Ecualización",
                Esperado: phasesData["ecualization"].expectedCarbon,
                Real: phasesData["ecualization"].avgCarbon,
                Desviación: phasesData["ecualization"].carbonDeviation,
            },
        ]);
        const mainTempReadings = mainCameraData.realReadings.map((reading) => {
            return [
                moment(reading[0]).format("YYYY-MM-DD HH:mm:ss"),
                reading[1],
            ];
        });
        const mainTempRealDataSheet = utils.aoa_to_sheet(mainTempReadings); //aoa en vez de json; es una matriz
        const carbonReadings = carbonData.realReadings.map((reading) => {
            return [
                moment(reading[0]).format("YYYY-MM-DD HH:mm:ss"),
                reading[1],
            ];
        });
        const carbonRealDataSheet = utils.aoa_to_sheet(carbonReadings);

        const templeReadings = templeData.realReadings.map((reading) => {
            return [
                moment(reading[0]).format("YYYY-MM-DD HH:mm:ss"),
                reading[1],
            ];
        });
        const templeRealDataSheet = utils.aoa_to_sheet(templeReadings);

        var new_workbook = utils.book_new();
        utils.book_append_sheet(new_workbook, summarySheet, "Resumen");
        utils.book_append_sheet(
            new_workbook,
            tempConditionSheet,
            "Condiciones Temperatura"
        );
        utils.book_append_sheet(
            new_workbook,
            carbonConditionSheet,
            "Condiciones Carbono"
        );
        utils.book_append_sheet(
            new_workbook,
            mainTempRealDataSheet,
            "Temperatura Cámara Principal"
        );
        utils.book_append_sheet(
            new_workbook,
            carbonRealDataSheet,
            "%Carbono Cámara Principal"
        );
        utils.book_append_sheet(
            new_workbook,
            templeRealDataSheet,
            "Temperatura Cámara Temple"
        );

        writeFile(new_workbook, "Ciclo.xlsx");
        setShowDownloadButton(false);
    };

    const downloadPDF = () => {
        setShowDownloadButton(false);
        //Wait for button to close
        setTimeout(() => {
            const quality = 1; // Higher the better but larger file
            document
                .getElementById("download-button")
                .style.setProperty("display", "none", "important");
            html2canvas(document.querySelector("#pdf-container"), {
                scale: quality,
            }).then((canvas) => {
                const pdf = new jsPDF("p", "mm", "a4");
                pdf.addImage(
                    canvas.toDataURL("image/png"),
                    "PNG",
                    0,
                    0,
                    211,
                    298
                );
                pdf.save("reporte.pdf");
                document
                    .getElementById("download-button")
                    .style.setProperty("display", "flex", "important");
            });
        }, 1000);
    };
    //On Load
    useEffect(() => {
        getCycle();
        getReport();
    }, [getCycle, getReport]);
    if (
        !cycle ||
        !carbonData ||
        !expectedPlotBands ||
        !realPlotBands ||
        !mainCameraData ||
        !phasesData ||
        !templeData
    )
        return null;
    return (
        <div id="pdf-container">
            <Breadcrumb className="p-3">
                <Breadcrumb.Item onClick={() => navigate(`/reportes`)}>
                    Reportes
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Ciclo {params.ciclo}</Breadcrumb.Item>
            </Breadcrumb>

            <Container>
                <div className="d-flex flex-row justify-content-center align-items-center w-100 position-relative">
                    <span className="fw-bold fs-4 text-center">
                        Resumen del ciclo
                    </span>
                    <div
                        id="download-button"
                        role="button"
                        onClick={() =>
                            setShowDownloadButton(!showDownloadButton)
                        }
                        className="position-absolute top-0 end-0 d-flex justify-content-around bg-primary text-white p-1 rounded-3 align-items-center"
                        style={{ width: 175, height: 40, userSelect: "none" }}
                    >
                        <span>Descargar</span>
                        <BsDownload size="20" />
                    </div>
                    {showDownloadButton && (
                        <div
                            style={{
                                position: "absolute",
                                top: 40,
                                right: 0,
                                userSelect: "none",
                            }}
                        >
                            <div
                                className="d-flex justify-content-between bg-primary text-white p-2 mt-2 rounded-3 hoverable"
                                onClick={downloadCSV}
                            >
                                <span>Descargar CSV</span>
                                <FaFileCsv size="25" className="mx-2" />
                            </div>
                            <div
                                className="d-flex justify-content-between bg-primary text-white p-2 mt-2 rounded-3 hoverable"
                                onClick={downloadExcel}
                            >
                                <span>Descargar Excel</span>
                                <FaFileExcel size="25" className="mx-2" />
                            </div>
                            <div
                                className="d-flex justify-content-between bg-primary text-white p-2 mt-2 rounded-3 hoverable"
                                onClick={downloadPDF}
                            >
                                <span>Descargar PDF</span>
                                <FaFilePdf size="25" className="mx-2" />
                            </div>
                        </div>
                    )}
                </div>
            </Container>
            <Container className="bg-extra m-3 p-4 w-75 rounded text-center mx-auto">
                <Row>
                    <Col className="fw-bold fs-5 text-body">ID Horno:88</Col>
                </Row>
                <Row className="mt-2 justify-content-center text-center">
                    <Col md={2} className="fs-6">
                        Inicio del ciclo
                    </Col>
                    <Col md={2} className="fs-6">
                        Fin del ciclo
                    </Col>
                    <Col md={2} className="fs-6">
                        Duración del ciclo
                    </Col>
                    <Col md={2} className="fs-6">
                        Tipo de ciclo
                    </Col>
                    <Col md={2} className="fs-6">
                        Pieza
                    </Col>
                </Row>
                <Row className="mt-2 justify-content-center text-center">
                    <Col md={2} className="fs-5 fw-bold">
                        {moment(cycle.start).format("HH:mm:ss")}
                    </Col>
                    <Col md={2} className="fs-5 fw-bold">
                        {cycle.end ? moment(cycle.end).format("HH:mm:ss") : "-"}
                    </Col>
                    <Col md={2} className="fs-5 fw-bold">
                        {cycle.duration ? cycle.duration : "-"}
                    </Col>
                    <Col md={2} className="fs-5 fw-bold">
                        {cycle.type}
                    </Col>
                    <Col md={2} className="fs-5 fw-bold">
                        999
                    </Col>
                </Row>
                <Row className="mt-2 justify-content-center text-center">
                    <Col md={2}>
                        {moment(cycle.start).format("DD MMM YYYY")}
                    </Col>
                    <Col md={2}>
                        {cycle.end
                            ? moment(cycle.end).format("DD MMM YYYY")
                            : "-"}
                    </Col>
                    <Col md={2} />
                    <Col md={2} />
                    <Col md={2} />
                </Row>
            </Container>
            <Container>
                <Row className="mt-5">
                    <Col>
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
                                navigate(
                                    `/reportes/ciclo/${params.ciclo}/fase/${plotBand}`,
                                    { replace: true }
                                );
                            }}
                        />

                        <span className="fw-bold fs-4 text-body text-center">
                            Condiciones temperatura
                        </span>
                    </Col>
                    <Col>
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
                                navigate(
                                    `/reportes/ciclo/${params.ciclo}/fase/${plotBand}`,
                                    { replace: true }
                                );
                            }}
                        />
                        <span className="fw-bold fs-4 text-body text-center">
                            Condiciones carbono
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table
                            id="data-table"
                            striped
                            bordered
                            hover
                            size="sm"
                            className="mt-4"
                        >
                            <thead>
                                <tr>
                                    <th className="text-center fs-6">
                                        Parámetros Horno
                                    </th>
                                    <th className="text-center fs-6">
                                        Esperado
                                    </th>
                                    <th className="text-center fs-6">Real</th>
                                    <th className="text-center fs-6">
                                        Desviación
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        Temperatura Aceite (°C)
                                    </td>
                                    <td className="fs-6 text-center">
                                        {
                                            phasesData["templeCamera"]
                                                .expectedTemp
                                        }
                                        °C
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {
                                            phasesData["templeCamera"]
                                                .avgTemperature
                                        }
                                        °C
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["templeCamera"]
                                                    .tempDeviation
                                            ),
                                        }}
                                    >
                                        {
                                            phasesData["templeCamera"]
                                                .tempDeviation
                                        }
                                        %
                                        {getValueColor(
                                            phasesData["templeCamera"]
                                                .tempDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        Temperatura Carburizado (°C)
                                    </td>
                                    <td className="fs-6 text-center">
                                        {phasesData["carburizado"].expectedTemp}
                                        °C
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {
                                            phasesData["carburizado"]
                                                .avgTemperature
                                        }
                                        °C
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["carburizado"]
                                                    .tempDeviation
                                            ),
                                        }}
                                    >
                                        {
                                            phasesData["carburizado"]
                                                .tempDeviation
                                        }
                                        %
                                        {getValueColor(
                                            phasesData["carburizado"]
                                                .tempDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        Temperatura Difusión (°C)
                                    </td>
                                    <td className="fs-6 text-center">
                                        {phasesData["difusion"].expectedTemp}°C
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {phasesData["difusion"].avgTemperature}
                                        °C
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["difusion"]
                                                    .tempDeviation
                                            ),
                                        }}
                                    >
                                        {phasesData["difusion"].tempDeviation}%
                                        {getValueColor(
                                            phasesData["difusion"].tempDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        Temperatura Ecualización (°C)
                                    </td>
                                    <td className="fs-6 text-center">
                                        {
                                            phasesData["ecualization"]
                                                .expectedTemp
                                        }
                                        °C
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {
                                            phasesData["ecualization"]
                                                .avgTemperature
                                        }
                                        °C
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["ecualization"]
                                                    .tempDeviation
                                            ),
                                        }}
                                    >
                                        {
                                            phasesData["ecualization"]
                                                .tempDeviation
                                        }
                                        %
                                        {getValueColor(
                                            phasesData["ecualization"]
                                                .tempDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <Table
                            striped
                            bordered
                            hover
                            size="sm"
                            className="mt-4"
                        >
                            <thead>
                                <tr>
                                    <th className="text-center fs-6">
                                        Parámetros Horno
                                    </th>
                                    <th className="text-center fs-6">
                                        Esperado
                                    </th>
                                    <th className="text-center fs-6">Real</th>
                                    <th className="text-center fs-6">
                                        Desviación
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        % Carbono Carburizado
                                    </td>
                                    <td className="fs-6 text-center">
                                        {
                                            phasesData["carburizado"]
                                                .expectedCarbon
                                        }
                                        %
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {phasesData["carburizado"].avgCarbon}%
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["carburizado"]
                                                    .carbonDeviation
                                            ),
                                        }}
                                    >
                                        {
                                            phasesData["carburizado"]
                                                .carbonDeviation
                                        }
                                        %
                                        {getValueColor(
                                            phasesData["carburizado"]
                                                .carbonDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        % Carbono Difusión
                                    </td>
                                    <td className="fs-6 text-center">
                                        {phasesData["difusion"].expectedCarbon}%
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {phasesData["difusion"].avgCarbon}%
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["difusion"]
                                                    .carbonDeviation
                                            ),
                                        }}
                                    >
                                        {phasesData["difusion"].carbonDeviation}
                                        %
                                        {getValueColor(
                                            phasesData["difusion"]
                                                .carbonDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        % Carbono Ecualización
                                    </td>
                                    <td className="fs-6 text-center">
                                        {
                                            phasesData["ecualization"]
                                                .expectedCarbon
                                        }
                                        %
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {phasesData["ecualization"].avgCarbon}%
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["ecualization"]
                                                    .carbonDeviation
                                            ),
                                        }}
                                    >
                                        {
                                            phasesData["ecualization"]
                                                .carbonDeviation
                                        }
                                        %
                                        {getValueColor(
                                            phasesData["ecualization"]
                                                .carbonDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <DashboardChart
                            realPlotBands={templeData.plotBands}
                            expectedPlotBands={[]}
                            realSeries={templeData.realReadings}
                            exceededPhases={
                                new Set(templeData.exceeded ? ["Temple"] : [])
                            }
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
                                navigate(
                                    `/reportes/ciclo/${params.ciclo}/fase/${plotBand}`,
                                    { replace: true }
                                );
                            }}
                        />
                        <span className="fw-bold fs-4 text-body text-center">
                            Condiciones Aceite
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table
                            striped
                            bordered
                            hover
                            size="sm"
                            className="mt-4"
                        >
                            <thead>
                                <tr>
                                    <th className="text-center fs-6">
                                        Parámetros Horno
                                    </th>
                                    <th className="text-center fs-6">
                                        Esperado
                                    </th>
                                    <th className="text-center fs-6">Real</th>
                                    <th className="text-center fs-6">
                                        Desviación
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="fs-6 text-center">
                                        Temperatura Aceite (°C)
                                    </td>
                                    <td className="fs-6 text-center">
                                        {
                                            phasesData["templeCamera"]
                                                .expectedTemp
                                        }
                                        °C
                                    </td>
                                    <td className="fs-6 text-center fw-bold">
                                        {
                                            phasesData["templeCamera"]
                                                .avgTemperature
                                        }
                                        °C
                                    </td>
                                    <td
                                        className="fs-6 text-center fw-bold"
                                        style={{
                                            color: getValueColor(
                                                phasesData["templeCamera"]
                                                    .tempDeviation
                                            ),
                                        }}
                                    >
                                        {
                                            phasesData["templeCamera"]
                                                .tempDeviation
                                        }
                                        %
                                        {getValueColor(
                                            phasesData["templeCamera"]
                                                .tempDeviation
                                        ) === "red" && " !"}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Container className="mx-auto p-4">
                {report &&
                    report.map((section) => (
                        <div key={section.section} className="mt-3">
                            <Row>
                                <Col
                                    className="fs-5 fw-bold d-flex justify-content-start"
                                    md={4}
                                >
                                    {section.section}
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col
                                    className="fs-5 fw-bold offset-md-4 d-flex justify-content-start"
                                    md={4}
                                >
                                    Real
                                </Col>
                                <Col
                                    className="fs-5 fw-bold d-flex justify-content-start"
                                    md={4}
                                >
                                    Esperado
                                </Col>
                            </Row>
                            {section.fields.map((field) => (
                                <Row key={field.id} className="mt-3">
                                    <Col
                                        className="fs-6 d-flex justify-content-start"
                                        md={4}
                                    >
                                        {field.name}
                                    </Col>
                                    <Col
                                        md={4}
                                        className="d-flex justify-content-start"
                                    >
                                        <span>{field.real ? field.real.real : ''}</span>
                                        <span>
                                            {field.unit ? field.unit : ""}
                                        </span>
                                    </Col>
                                    <Col
                                        md={4}
                                        className="d-flex justify-content-start"
                                    >
                                        <span>{field.expected.expected}</span>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    ))}
                <Row className="mt-4">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start  mb-3 "
                        md={4}
                    >
                        Observaciones
                    </Col>
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start"
                        md={12}
                    >
                        <textarea
                            className="w-100"
                            disabled
                            value={observations}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start mb-3 "
                        md={4}
                    >
                        Disposición
                    </Col>
                </Row>
                <Row className="">
                    <Col
                        className="d-flex justify-content-start align-items-center"
                        md={4}
                    >
                        <input
                            type="radio"
                            id="aceptado"
                            className="me-3 "
                            name="disposition"
                            disabled
                            defaultChecked={analyzer && disposition}
                        />
                        <label htmlFor="aceptado" className="fw-bold">
                            Aceptado
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className="d-flex justify-content-start align-items-center"
                        md={4}
                    >
                        <input
                            type="radio"
                            id="rechazado"
                            name="disposition"
                            className="me-3"
                            defaultChecked={analyzer && !disposition}
                            disabled
                        />
                        <label htmlFor="rechazado" className="fw-bold">
                            Rechazado
                        </label>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start mb-3 "
                        md={4}
                    >
                        Operador:  {operator ? `${operator.name} - ${operator.payrollId}` : '-'}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start mb-3 "
                        md={4}
                    >
                        Analizó:  {analyzer ? `${analyzer.name} - ${analyzer.payrollId}` : '-'}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start"
                        md={4}
                    >
                        Autorizó: {authorizer ? `${authorizer.name} - ${authorizer.payrollId}` : '-'}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start align-items-center "
                        md={4}
                    >
                        Visto bueno:{" "}
                        <input
                            type="checkbox"
                            className="ms-2"
                            checked={vistoBueno}
                            disabled
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Summary;
