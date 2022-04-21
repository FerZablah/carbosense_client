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

const OvenAdministrationModal = ({show, onHide, oven, title, submitText}) => {
  const [sensorTypes, setSensorTypes] = useState("");
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
        <div className="p-2 w-full">
          <div>
            <span className="text-body fs-5">Número de horno</span>
            <input type="text" className="form-control" placeholder="01" />
          </div>
          <div className="mt-2">
            <span className="text-body fs-5 mt-2">Alias</span>
            <input
              type="text"
              className="form-control"
              placeholder="Horno principal"
            />
          </div>
          <div className="mt-2">
            <span className="text-body fs-5 mt-2">Id sensor</span>
            <input type="text" className="form-control" placeholder="001" />
          </div>
          <div className="mt-2">
            <span className="text-body fs-5">Tipo de sensor</span>
            <Select
              placeholder="Cámara principal"
              options={sensorTypes}
              value={sensorTypes}
              onChange={(newValue) => setSensorTypes(newValue)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="link" onClick={onHide}>Cancelar</Button> */}
        <Button className="btn-secondary text-white">Agregar</Button>
      </Modal.Footer>   
    </Modal>
  );
};

export default OvenAdministrationModal;
