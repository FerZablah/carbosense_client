import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const Reports = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="mt-3 fw-bold fs-1 text-center">Reportes</Col>
        </Row>
      </Container>
      <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
        <Row>
          <Col className="text-center fs-6 fw-bold">Antes de:</Col>
          <Col>
            <input type="date" />
          </Col>
          <Col className="text-center fs-6 fw-bold">Después de:</Col>
          <Col>
            <input type="date" />
          </Col>
          <Col className="text-center fs-6 fw-bold">Tipo de ciclo:</Col>
          <Col className="text-center fs-6">
            <button
              class="btn btn-white dropdown-toggle text-center"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Seleccionar tipos
            </button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3 fs-6 fw-bold">Duración:</Col>

          <Col>
            <div className="d-flex flex-row align-items-center justify-content-center h-100">
              <select name="cars" id="cars">
                <option value="volvo">{'>='}</option>
              </select>
             {/* <button
                class="h-25 btn btn-white dropdown-toggle text-center"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {'>='}
  </button> */}
              <input type="number" className="mx-2 w-50" />
              <select name="cars" id="cars">
                <option value="volvo">{'minutos'}</option>
              </select>
            </div>


          </Col>

          <Col className="text-center mt-3 fs-6 fw-bold">Horno:</Col>
          <Col className="text-center mt-3 fs-6">
            <button
              class="btn btn-white dropdown-toggle text-center"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Seleccionar horno
            </button>

          </Col>
          <Col className="text-center mt-3 fs-6 fw-bold">Pieza:</Col>
          <Col className="text-center mt-3 fs-6">
            <button
              class="btn btn-white dropdown-toggle text-center"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Seleccionar piezas
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
          <tbody>
            <td className="fs-6 text-center">2</td>
            <td className="fs-6 text-center">02-03-2022 10:00:14</td>
            <td className="fs-6 text-center">02-03-2022 22:00:14</td>
            <td className="fs-6 text-center">12:00:00</td>
            <td className="fs-6 text-center">Ecualización</td>
            <td className="fs-6 text-center">88</td>
            <td className="fs-6 text-center">780</td>
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
