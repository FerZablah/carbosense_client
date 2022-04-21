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
import RecipeModal from "./RecipeModal";

const Recipe = (props) => {
  const [showConfirmModal, setConfirmModal] = useState(false);

  const numPieces = [
    { value: "999", label: "999" },
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
        <Breadcrumb.Item active>Selección de recetas</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
      <RecipeModal
          show={showConfirmModal}
          onHide={() => setConfirmModal(false)}
        />
        <Row>
          <Col className="mt-3 fw-bold fs-1 text-center">
            Selección de Recetas de Hornos
          </Col>
        </Row>
      </Container>
      <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
        <Row>
          <Col md={2} className="text-center fs-6 fw-bold">
            Número de pieza:
          </Col>
          <Col>
            <div>
              <Select
                placeholder="Seleccionar número de pieza"
                options={numPieces}
                // onChange={(newValue) => {
                //   setSelectedOvens(newValue.map((item) => item.value));
                // }}
              />
            </div>
          </Col>
          <Col md={2}>
            <button
              onClick={() => setConfirmModal(true)}
              type="button"
              className="btn btn-link fs-6 text-center"
            >
              Confirmar seleccion
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Recipe;
