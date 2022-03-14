import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import Table from "react-bootstrap/Table";

const Summary = () => {
  return (
    <div>
      <h6>Reportes - Ciclo 2 </h6>
      <BsDownload role="button" size="20" className="ms-3"/>
      <Container>
        <Row>
          <Col className="mt-3 fw-bold fs-4 text-center">Resumen del ciclo</Col>
        </Row>
      </Container>
      <Container className="bg-extra m-3 p-4 w-75 rounded text-center mx-auto">
        <Row>
          <Col className="fw-bold fs-5 text-body">ID Horno:88</Col>
        </Row>
        <Row className="ms-5 mt-4 text-center">
          <Col className="fs-6">Inicio del ciclo</Col>
          <Col className="fs-6">Fin del ciclo</Col>
          <Col className="fs-6">Duración del ciclo</Col>
          <Col className="fs-6">Tipo de ciclo</Col>
          <Col className="fs-6">Pieza</Col>
        </Row>
        <Row className="ms-5 mt-2 text-center">
          <Col className="fs-5 fw-bold">04:30:01</Col>
          <Col className="fs-5 fw-bold">11:03:37</Col>
          <Col className="fs-5 fw-bold">06:33:36</Col>
          <Col className="fs-5 fw-bold">Carburizado</Col>
          <Col className="fs-5 fw-bold">768</Col>
        </Row>
        <Row className="ms-5 mt-2 text-center">
          <Col>14 Abril 2021</Col>
          <Col>14 Abril 2021</Col>
          <Col />
          <Col />
          <Col />
        </Row>
      </Container>
      <Container>
        <Row className="mt-5">
          <Col className="fw-bold fs-4 text-body text-center">
            Condiciones carbono
          </Col>
          <Col className="fw-bold fs-4 text-body text-center">
            Condiciones temperatura
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover size="sm" className="mt-4">
              <thead>
                <tr>
                  <th className="text-center fs-6">Parámetros Horno</th>
                  <th className="text-center fs-6">Set Point</th>
                  <th className="text-center fs-6">Actual</th>
                  <th className="text-center fs-6">Desviación</th>
                </tr>
              </thead>
              <tbody>
                <td className="fs-6 text-center">% Carbono Carburizado</td>
                <td className="fs-6 text-center">1.20%</td>
                <td className="fs-6 text-center fw-bold">1.40%</td>
                <td className="fs-6 text-center text-warning fw-bold">16%</td>
              </tbody>
              <tbody>
                <td className="fs-6 text-center">% Carbono Difusión</td>
                <td className="fs-6 text-center">0.90%</td>
                <td className="fs-6 text-center fw-bold">0.89%</td>
                <td className="fs-6 text-center text-success fw-bold">1.11%</td>
              </tbody>
              <tbody>
                <td className="fs-6 text-center">% Carbono Ecualización</td>
                <td className="fs-6 text-center">0.90%</td>
                <td className="fs-6 text-center fw-bold">0.89%</td>
                <td className="fs-6 text-center text-success fw-bold">1.11%</td>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table striped bordered hover size="sm" className="mt-4">
              <thead>
                <tr>
                  <th className="text-center fs-6">Parámetros Horno</th>
                  <th className="text-center fs-6">Set Point</th>
                  <th className="text-center fs-6">Actual</th>
                  <th className="text-center fs-6">Desviación</th>
                </tr>
              </thead>
              <tbody>
                <td className="fs-6 text-center">Temperatura Aceite (°C)</td>
                <td className="fs-6 text-center">70°C</td>
                <td className="fs-6 text-center fw-bold">40°C</td>
                <td className="fs-6 text-center text-danger fw-bold">42%</td>
              </tbody>
              <tbody>
                <td className="fs-6 text-center">
                  Temperatura Carburizado (°C)
                </td>
                <td className="fs-6 text-center">945°C</td>
                <td className="fs-6 text-center fw-bold">955°C</td>
                <td className="fs-6 text-center text-success fw-bold">1.05%</td>
              </tbody>
              <tbody>
                <td className="fs-6 text-center">Temperatura Difusión (°C)</td>
                <td className="fs-6 text-center">945°C</td>
                <td className="fs-6 text-center fw-bold">945°C</td>
                <td className="fs-6 text-center text-success fw-bold">0%</td>
              </tbody>
              <tbody>
                <td className="fs-6 text-center">Temperatura Aceite (°C)</td>
                <td className="fs-6 text-center">945°C</td>
                <td className="fs-6 text-center fw-bold">945°C</td>
                <td className="fs-6 text-center text-success fw-bold">0%</td>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Summary;
