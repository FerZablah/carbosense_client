import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const ReportPhase = () => {
  return (
    <div>
      <h6>Reportes - Ciclo 2 - Carburizado</h6>
      <Container>
        <Row>
          <Col className="mt-3 fw-bold fs-3 text-center">Fase Carburizado</Col>
        </Row>
      </Container>
      <Container className="bg-extra m-3 p-4 w-50 rounded text-center mx-auto">
        <Row>
          <Col className="fw-bold fs-5 text-body">ID Horno:88</Col>
        </Row>
        <Row className="mt-4 text-center">
          <Col className="fs-6">Inicio de la fase</Col>
          <Col className="fs-6">Fin de la fase</Col>
          <Col className="fs-6">Duración de fase</Col>
        </Row>
        <Row className="mt-2 text-center">
          <Col className="fs-5 fw-bold">04:30:01</Col>
          <Col className="fs-5 fw-bold">11:03:37</Col>
          <Col className="fs-5 fw-bold">06:33:36</Col>
        </Row>
        <Row className="mt-2 text-center">
          <Col>14 Abril 2021</Col>
          <Col>14 Abril 2021</Col>
          <Col />
        </Row>
      </Container>
      <Container>
        <Row className="mt-5">
          <Col className="fw-bold fs-5 text-body text-center">
            Temperatura cámara principal
          </Col>
          <Col className="fw-bold fs-5 text-body text-center">
            Porcentaje oxígeno
          </Col>
        </Row>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col>
            <Table striped bordered hover size="sm" className="mt-4">
              <thead>
                <tr>
                  <th className="text-center fs-6">Parámetros Horno</th>
                  <th className="text-center fs-6">Set Point</th>
                  <th className="text-center fs-6">Actual</th>
                  <th className="text-center fs-6">Cambio</th>
                </tr>
              </thead>
              <tbody>
                <td className="fs-6 text-center">% Carbono</td>
                <td className="fs-6 text-center">1.20%</td>
                <td className="fs-6 text-center fw-bold">1.40%</td>
                <td className="fs-6 text-center text-warning fw-bold">16%</td>
              </tbody>
              <tbody>
                <td className="fs-6 text-center">Temperatura</td>
                <td className="fs-6 text-center">90°C</td>
                <td className="fs-6 text-center fw-bold">90°C</td>
                <td className="fs-6 text-center text-black fw-bold">0%</td>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReportPhase;
