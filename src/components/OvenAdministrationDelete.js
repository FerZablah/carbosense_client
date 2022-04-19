import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/bootstrap.css";
import Select from "react-select";

const sensorTypes = [
  { value: "principal", label: "Cámara Principal" },
  { value: "oxygen", label: "Oxígeno" },
  { value: "temple", label: "Cámara de temple" },
];

const OvenAdministrationDelete = ({
  show,
  onHide,
  oven,
  title,
  submitText,
}) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
      }}
    >
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            ¿Estás seguro que quiere eliminar el horno del sistema?
        </Modal.Body>
        <Modal.Footer>
        <Button variant="link" onClick={onHide}>
                    Cancelar
                </Button>
                <Button
                    className="btn-primary text-white"
                    // onClick={() => {
                    //     onSubmit(user);
                    //     onHide();
                    // }}
                >
                    Eliminar
                </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default OvenAdministrationDelete;
