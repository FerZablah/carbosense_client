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
import { GiSandsOfTime } from "react-icons/gi";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const MetallurgyReports = (props) => {
    //navigation hook
    let navigate = useNavigate();

    const [reports, setReports] = useState([]);

    //"escucha" cambios de variables, no se necesita un boton de buscar
    const searchReports = useCallback(async () => {
        const res = await axios.get(`http://localhost:4000/report`);
        //sort by auhorized by being not null
        const sortedReports = res.data.sort((a, b) => {
            if (a.authorizedBy === null && b.authorizedBy === null) {
                return 0;
            } else if (a.authorizedBy === null) {
                return 1;
            } else if (b.authorizedBy === null) {
                return -1;
            } else {
                return 0;
            }
        });
        setReports(sortedReports);
    }, []);

    //On Load
    useEffect(() => {
        searchReports();
    }, [searchReports]);
    const renderIcon = (analyzedBy, disposition) => {
        console.log(analyzedBy, disposition);
        if (analyzedBy === null) {
            return <GiSandsOfTime className="rounded-circle" size={25} />;
        } else if (disposition) {
            return (
                <AiFillCheckCircle
                    className="text-success rounded-circle bg-white"
                    size={25}
                />
            );
        } else {
            return (
                <AiFillCloseCircle
                    className="text-danger rounded-circle bg-white"
                    size={25}
                />
            );
        }
    };
    const renderTable = () => {
        if (reports.length < 1) {
            console.log("No hay reportes");
            return (
                <div className="mt-3">
                    <h6>No hay reportes</h6>
                </div>
            );
        } else {
            return (
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
                            <th className="text-center fs-6">Analizado</th>
                        </tr>
                    </thead>
                    {reports.map((report, index) => (
                        <tbody key={report.id}>
                            <tr
                                className="table-row"
                                onClick={() =>
                                    navigate(`/metalurgica/${report.id}`)
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
                                <td className="fs-6 text-center table-cell">
                                    {renderIcon(
                                        report.analyzedBy,
                                        report.disposition
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            );
        }
    };
    return (
        <div>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item active>Reportes metalurgica</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Row>
                    <Col className="mt-3 fw-bold fs-1 text-start">
                        Reportes metalurgica
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="mt-3 fw-bold fs-3 text-body">Reportes</Col>
                </Row>
                {renderTable()}
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

export default MetallurgyReports;
