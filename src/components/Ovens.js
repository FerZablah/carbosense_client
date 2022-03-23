import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Breadcrumb,
} from "react-bootstrap";
import Select from "react-select";

const Ovens = () => {
  const numPieces = [
    { value: "768", label: "768" },
    { value: "780", label: "780" },
  ];
  const idOven = [
    { value: "88", label: "88" },
    { value: "90", label: "90" },
  ];
  return (
    <div>
      <Breadcrumb className="p-3">
      <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Selección de hornos</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Row>
          <Col className="mt-3 fw-bold fs-1 text-center">
            Selección de Hornos
          </Col>
        </Row>
      </Container>
      <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
        <Row>
          <Col md={1} className="text-center fs-6 fw-bold mt-1">
            Horno:
          </Col>
          <Col md={3}>
            <div>
              <Select
                placeholder="Seleccionar horno"
                isClearable
                options={idOven}
                // onChange={(newValue) => {
                //   setSelectedOvens(newValue.map((item) => item.value));
                // }}
              />
            </div>
          </Col>
          <Col md={2} className="text-center fs-6 fw-bold">
            Número de pieza:
          </Col>
          <Col>
            <div>
              <Select
                placeholder="Seleccionar número de pieza"
                isClearable
                options={numPieces}
                // onChange={(newValue) => {
                //   setSelectedOvens(newValue.map((item) => item.value));
                // }}
              />
            </div>
          </Col>
          <Col md={2}>
            <button type="button" className="btn btn-link fs-6 text-center">
              Confirmar seleccion
            </button>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* <Modal> */}
          <Modal.Header>
            <Modal.Title>Selección de hornos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro que quieres seleccionar la pieza{" "}
            <strong>{760}</strong> para ingresar al horno <strong>{88}</strong>?
          </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" className="text-white">
            Cancelar
          </Button>
          <Button variant="success" className="text-white btn btn-link">
            Confirmar
          </Button>
        </Modal.Footer>
        {/* </Modal> */}
      </Container>
    </div>
  );
};

export default Ovens;
