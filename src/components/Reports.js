import React, { useEffect, useState, useCallback } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Breadcrumb,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { BsArrowClockwise } from "react-icons/bs";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Reports = (props) => {
    //navigation hook
    let navigate = useNavigate();

    //before, after, type, lengthOperator, lengthNumber, oven, partNumber
    const [after, setAfter] = useState(moment.utc().subtract(7, "days"));
    const [before, setBefore] = useState(moment.utc());
    const [types, setTypes] = useState([]);
    const [selectedOvens, setSelectedOvens] = useState([]);
    const [selectedPartNumbers, setSelectedPartNumbers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reports, setReports] = useState([]);
    // const [lengthOperator, setLengthOperator] = useState(null);
    // const [lengthNumber, setLengthNumber] = useState(null);

    //"escucha" cambios de variables, no se necesita un boton de buscar
    const searchReports = useCallback(async () => {
        setLoading(true);
        const res = await axios.get(`http://localhost:4000/report`, {
            params: {
                after,
                before,
                types: types.join(","),
                ovens: selectedOvens.join(","),
                partNumbers: selectedPartNumbers.join(","),
                // lengthOperator,
                // lengthNumber,
            },
        });
        setLoading(false);
        setReports(res.data);
    }, [after, before, types, selectedOvens, selectedPartNumbers]);

    //On Load
    useEffect(() => {
        searchReports();
    }, [searchReports]);

    const cycleType = [
        { value: "carburizado", label: "Carburizado" },
        { value: "temple", label: "Temple integral" },
    ];
    const pieces = [
        { value: "999", label: "999" },
        { value: "780", label: "780" },
    ];
    const ovens = [
        { value: "88", label: "88" },
        { value: "90", label: "90" },
    ];

    // if (!reports) {
    //   return (
    //     <div>
    //       <Breadcrumb className="p-3">
    //         <Breadcrumb.Item onClick={() => navigate(`/`)}>Inicio</Breadcrumb.Item>
    //         <Breadcrumb.Item active>
    //           Horno {params.id}
    //         </Breadcrumb.Item>
    //       </Breadcrumb>
    //       <Spinner className="center p-4" animation="border" role="status" />
    //       <h1 className="text-center p-4">No hay un reporte registrado</h1>
    //     </div>
    //   )
    return (
        <div>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item active>Reportes</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Row>
                    <Col className="mt-3 fw-bold fs-1 text-center">
                        Reportes
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="mt-3 fw-bold fs-1 text-end">
                        <BsArrowClockwise size="20" className="text-black" />
                        <button
                            className="btn btn-link text-black"
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Reiniciar filtros
                        </button>
                    </Col>
                </Row>
            </Container>
            <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
                <Row>
                    <Col md={1} className="text-center fs-6 fw-bold">
                        Después de:
                    </Col>
                    <Col md={3}>
                        <input
                            type="datetime-local"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setAfter(null);
                                } else {
                                    setAfter(
                                        moment(
                                            e.target.value,
                                            "YYYY-MM-DDTHH:mm"
                                        ).utc()
                                    );
                                }
                            }}
                            value={
                                after
                                    ? after
                                        .clone()
                                        .local()
                                        .format("YYYY-MM-DDTHH:mm:ss")
                                    : ""
                            }
                        />
                    </Col>
                    <Col md={1} className="text-center fs-6 fw-bold">
                        Antes de:
                    </Col>
                    <Col md={3}>
                        <input
                            type="datetime-local"
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setBefore(null);
                                } else {
                                    setBefore(
                                        moment(
                                            e.target.value,
                                            "YYYY-MM-DDTHH:mm"
                                        ).utc()
                                    );
                                }
                            }}
                            value={
                                before
                                    ? before
                                        .clone()
                                        .local()
                                        .format("YYYY-MM-DDTHH:mm:ss")
                                    : ""
                            }
                        />
                    </Col>

                    <Col md={1} className="text-center fs-6 fw-bold">
                        Tipo de proceso:
                    </Col>
                    <Col md={3}>
                        <div className="">
                            <Select
                                placeholder="Seleccionar tipo(s)"
                                isClearable
                                isMulti
                                options={cycleType}
                                onChange={(newValue) => {
                                    setTypes(
                                        newValue.map((item) => item.value)
                                    );
                                }}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={1} className="text-center mt-3 fs-6 fw-bold">
                        Horno:
                    </Col>
                    <Col md={3}>
                        <div className="mt-2">
                            <Select
                                placeholder="Seleccionar horno(s)"
                                isClearable
                                isMulti
                                options={ovens}
                                onChange={(newValue) => {
                                    setSelectedOvens(
                                        newValue.map((item) => item.value)
                                    );
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={1} className="text-center mt-3 fs-6 fw-bold">
                        No. Parte:
                    </Col>
                    <Col md={3}>
                        <div className="mt-2">
                            <Select
                                isDisabled
                                placeholder="Seleccionar No. parte(s)"
                                isClearable
                                isMulti
                                options={pieces}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="mt-3 fw-bold fs-3 text-body">Ciclos</Col>
                </Row>
                {
                    reports.length < 1 ? (
                        <h4>No existen reportes que coincidan con la busqueda</h4>
                    )
                        : (
                            <Table striped bordered hover size="sm" className="mt-4">
                                <thead>
                                    <tr>
                                        <th className="text-center fs-6">#</th>
                                        <th className="text-center fs-6">Inicio</th>
                                        <th className="text-center fs-6">Fin</th>
                                        <th className="text-center fs-6">Duración</th>
                                        <th className="text-center fs-6">Tipo</th>
                                        <th className="text-center fs-6">Horno</th>
                                        <th className="text-center fs-6">Pieza</th>
                                    </tr>
                                </thead>
                                {reports.map((report, index) => (
                                    <tbody key={report.id}>
                                        <tr
                                            className="table-row"
                                            onClick={() =>
                                                navigate(`/reportes/${report.id}`)
                                            }
                                        >
                                            <td className="fs-6 text-center table-cell">
                                                {report.id}
                                            </td>
                                            <td className="fs-6 text-center table-cell">
                                                {moment(report.start).format(
                                                    "HH:mm:ss DD/MM/YYYY"
                                                )}
                                            </td>
                                            <td className="fs-6 text-center table-cell">
                                                {report.end
                                                    ? moment(report.end).format(
                                                        "HH:mm:ss DD/MM/YYYY"
                                                    )
                                                    : "-"}
                                            </td>
                                            <td className="fs-6 text-center table-cell">
                                                {report.duration}
                                            </td>
                                            <td className="fs-6 text-center table-cell">
                                                {report.type ? report.type : "-"}
                                            </td>
                                            <td className="fs-6 text-center table-cell">
                                                {report.oven}
                                            </td>
                                            <td className="fs-6 text-center table-cell">
                                                999
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </Table>
                        )
                }
            </Container>
            <br></br>
            <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">
                            Anterior
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className="page-item disabled">
                        <a className="page-link" href="#">
                            Siguiente
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Reports;
