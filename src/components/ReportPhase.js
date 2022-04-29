import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Breadcrumb,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import translatePhase from "../phasesDisplay";
import { BASE_URL } from "../utils";
import DashboardChart from "./DashboardChart";

const ReportPhase = () => {
    const getValueColor = (value) => {
        if (value > 0 && value < 5) {
            return "green";
        } else if (value > 5 && value < 10) {
            return "orange";
        } else {
            return "red";
        }
    };
    const navigate = useNavigate();
    const params = useParams();
    const [phase, setPhase] = useState(null);
    const getPhase = useCallback(async () => {
        const res = await axios.get(
            `${BASE_URL}/report/${params.ciclo}/phase/${params.fase}`
        );
        setPhase(res.data);
    }, [params.ciclo, params.fase]);
    useEffect(() => {
        getPhase();
    }, [getPhase]);

    if (!phase) return null;
    return (
        <div>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item onClick={() => navigate(`/reportes`)}>
                    Reportes
                </Breadcrumb.Item>
                <Breadcrumb.Item
                    onClick={() => navigate(`/reportes/${params.ciclo}`)}
                >
                    Ciclo {params.ciclo}
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
                    {translatePhase[params.fase]}
                </Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Row>
                    <Col className="mt-3 fw-bold fs-3 text-center">
                        Fase {translatePhase[params.fase]}
                    </Col>
                </Row>
            </Container>
            <Container className="bg-extra m-3 p-4 w-50 rounded text-center mx-auto">
                <Row>
                    <Col className="fw-bold fs-5 text-body">ID Horno:{88}</Col>
                </Row>
                <Row className="mt-4 text-center">
                    <Col className="fs-6">Inicio de la fase</Col>
                    <Col className="fs-6">Fin de la fase</Col>
                    <Col className="fs-6">Duración de fase</Col>
                </Row>
                <Row className="mt-2 text-center">
                    <Col className="fs-5 fw-bold">
                        {moment(phase.phase.start).format("HH:mm:ss")}
                    </Col>
                    <Col className="fs-5 fw-bold">
                        {phase.phase.end
                            ? moment(phase.phase.end).format("HH:mm:ss")
                            : "-"}
                    </Col>
                    <Col className="fs-5 fw-bold">
                        {phase.duration ? phase.duration : "-"}
                    </Col>
                </Row>
                <Row className="mt-2 text-center">
                    <Col>{moment(phase.phase.start).format("DD MMM YYYY")}</Col>
                    <Col>{moment(phase.phase.end).format("DD MMM YYYY")}</Col>
                    <Col />
                </Row>
            </Container>
            <Container>
                <Row className="mt-5">
                    <Col>
                        <DashboardChart
                            realPlotBands={[]}
                            expectedPlotBands={[]}
                            exceededPhases={new Set()}
                            realSeries={phase.avgTemperatureReadings}
                            expectedSeries={phase.mainCameraExpectedReadings}
                            maxLimitSeries={phase.mainCameraLimitReadings.max}
                            minLimitSeries={phase.mainCameraLimitReadings.min}
                            title={"Temperatura cámara principal"}
                            yAxisTitle={"Temperatura °C"}
                            toolTipSuffix={"°C"}
                            yAxisMax={1200}
                            yAxisMin={0}
                            ovenId={params.ciclo}
                        />
                        <span className="fw-bold fs-5 text-body text-center">
                            Temperatura cámara principal
                        </span>
                    </Col>
                    <Col>
                        <DashboardChart
                            realPlotBands={[]}
                            expectedPlotBands={[]}
                            exceededPhases={new Set()}
                            realSeries={phase.carbonReadings}
                            expectedSeries={phase.carbonExpectedReadings}
                            maxLimitSeries={phase.carbonLimitReadings.max}
                            minLimitSeries={phase.carbonLimitReadings.min}
                            title={"Porcentaje de carbono"}
                            yAxisTitle={"Porcentaje carbono %"}
                            toolTipSuffix={"%"}
                            yAxisMax={3}
                            yAxisMin={0}
                            ovenId={params.ciclo}
                        />
                        <span className="fw-bold fs-5 text-body text-center">
                            Porcentaje carbono
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
                                <td className="fs-6 text-center">% Carbono</td>
                                <td className="fs-6 text-center">
                                    {phase.expectedCarbon}%
                                </td>
                                <td className="fs-6 text-center fw-bold">
                                    {phase.avgCarbon}%
                                </td>
                                <td
                                    className="fs-6 text-center fw-bold"
                                    style={{
                                        color: getValueColor(
                                            phase.carbonDeviation
                                        ),
                                    }}
                                >
                                    {phase.carbonDeviation}%
                                    {getValueColor(phase.carbonDeviation) ===
                                        "red" && " !"}
                                </td>
                            </tbody>
                            <tbody>
                                <td className="fs-6 text-center">
                                    Temperatura
                                </td>
                                <td className="fs-6 text-center">
                                    {phase.expectedTemp}°C
                                </td>
                                <td className="fs-6 text-center fw-bold">
                                    {phase.avgTemperature}°C
                                </td>
                                <td
                                    className="fs-6 text-center fw-bold"
                                    style={{
                                        color: getValueColor(
                                            phase.tempDeviation
                                        ),
                                    }}
                                >
                                    {phase.tempDeviation}%
                                    {getValueColor(phase.tempDeviation) ===
                                        "red" && " !"}
                                </td>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ReportPhase;
