import axios from "axios";
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
  onDeleteSubmit,
}) => {
  const onSubmit = async () => {
    await axios.delete(`http://localhost:4000/oven/${oven.id}`);
    toast.success("Horno eliminado correctamente");
    onDeleteSubmit();
    onHide();
  };
  if (!oven) return null;
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
        ¿Estás seguro que quiere eliminar el horno <strong>{oven.id} ({oven.alias}) </strong> del sistema?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          className="btn-primary text-white"
          onClick={() => {
            onSubmit();
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OvenAdministrationDelete;
