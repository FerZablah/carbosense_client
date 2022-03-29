import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/bootstrap.css";

const RecipeModal = ({ show, onHide, onSubmit, recipes }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Selección de Recetas de Hornos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="m-2 p-3 w-full mx-auto rounded">
          <Row>
            <Col className="text-body fs-5">Estás seguro que quieres ingresar la carga <strong>768</strong> en el horno <strong>88</strong>?</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={() => window.location.reload()}>Cancelar</Button>
      <Button variant="primary text-white" onClick={onHide}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;