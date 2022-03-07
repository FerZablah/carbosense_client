import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const Reports = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="mt-3 fw-bold fs-1 text-body">Reportes</Col>
        </Row>
      </Container>
      <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
        <Row>
          <Col className="text-start fs-6 fw-bold">Antes de:</Col>
          <Col className="text-start fs-6 fw-bold">Tipo de ciclo:</Col>
          <Col />
        </Row>
        <Row>
          <Col className="text-start mt-3 fs-6 fw-bold">Después de:</Col>
          <Col className="text-start mt-3 fs-6 fw-bold">Horno:</Col>
          <Col />
        </Row>
        <Row>
          <Col className="text-start mt-3 fs-6 fw-bold">Duración:</Col>
          <Col className="text-start mt-3 fs-6 fw-bold">Pieza:</Col>
          <Col />
        </Row>
        <Row>
          <Col />
          <Col />
          <Col className="text-end">
            <button
              type="button"
              className="ms-5 btn btn-extra mt-3 text-black fs-6"
            >
              Reiniciar filtros
            </button>
          </Col>
          <Col className="text-start">
            <button
              type="button"
              className="btn btn-primary mt-3 text-white fs-6"
            >
              Aplicar filtros
            </button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="mt-3 fw-bold fs-3 text-body">Ciclos</Col>
        </Row>
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
          <tbody>
            <td className="fs-6 text-center">1</td>
            <td className="fs-6 text-center">02-02-2022 15:00:29</td>
            <td className="fs-6 text-center">02-02-2022 19:00:29</td>
            <td className="fs-6 text-center">4:00:00</td>
            <td className="fs-6 text-center">Carburizado</td>
            <td className="fs-6 text-center">88</td>
            <td className="fs-6 text-center">768</td>
          </tbody>
        </Table>
      </Container>
      <br></br>
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">
              Anterior
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Siguiente
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Reports;
