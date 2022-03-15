import React, { useEffect, useState, Component } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { BsArrowClockwise } from "react-icons/bs";

const Reports = (props) => {
  const cycleType = [
    { value: "carburizado", label: "Carburizado" },
    { value: "temple", label: "Temple industrial" },
  ];
  const pieces = [
    { value: "768", label: "768" },
    { value: "780", label: "780" },
  ];
  const ovens = [{ value: "88", label: "88" }];
  const signs = [{ value: ">=", label: ">=" }];
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
            <input type="datetime-local" />
          </Col>
          <Col className="text-center fs-6 fw-bold">Después de:</Col>
          <Col>
            <input type="datetime-local" />
          </Col>
          <Col className="text-center fs-6 fw-bold">Tipo de ciclo:</Col>
          <Col>
            <div className="">
              <Select options={cycleType} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3 fs-6 fw-bold">Duración:</Col>
          <Col>
            <div className="d-flex flex-row align-items-center justify-content-center h-100">
              <select name="cars" id="cars">
                <option value="volvo">{">="}</option>
              </select>
              <input type="number" className="mx-2 w-50" />
              <select name="time" id="time">
                <option value="time">{"minutos"}</option>
              </select>
            </div>
          </Col>

          <Col className="text-center mt-3 me-4 fs-6 fw-bold">Horno:</Col>
          <Col>
            <div className="mt-2">
              <Select options={ovens} />
            </div>
            {/* <div className="d-flex flex-row align-items-center h-100">
              <input type="number" className="w-50" />
            </div> */}
          </Col>
          <Col className="text-center mt-3 fs-6 ms-4 fw-bold">Pieza:</Col>
          <Col>
            <div className="mt-2">
              <Select options={pieces} />
            </div>
            {/* <div className="d-flex align-items-center h-100">
              <input type="number" className="mx-4 w-50" />
            </div> */}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col className="mt-3 fw-bold fs-1 text-end">
          <BsArrowClockwise size="20" className= "text-black" />
            <button
              className="btn btn-link text-black"
              type="button"
              // onClick={}
            >
              Reiniciar filtros
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
