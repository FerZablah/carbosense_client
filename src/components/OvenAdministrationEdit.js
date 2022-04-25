import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/bootstrap.css";
import Select from "react-select";

const OvenAdministrationEdit = ({ ovens, show, onHide, title }) => {
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
        <div className="p-2 w-100">
          <div>
            <span className="text-body fs-6">Número de horno</span>
            <input type="text" className="form-control" placeholder="01" />
          </div>
          <div className="mt-2">
            <span className="text-body fs-6 mt-2">Alias</span>
            <input
              type="text"
              className="form-control"
              placeholder="Horno principal"
            />
          </div>
          <div>
            <span className="fs-4 fw-bold">Sensores</span>
          </div>
          <div>
            <span className="text-body fs-6">Cámara principal</span>
            <input type="text" className="form-control" placeholder="01" />
            <Button className="btn-secondary text-white mt-2">
              Añadir sensor
            </Button>
          </div>
          <div>
            <span className="text-body fs-6">Oxígeno</span>
            <input type="text" className="form-control" placeholder="01" />
            <Button className="btn-secondary text-white mt-2">
              Añadir sensor
            </Button>
          </div>
          <div>
            <span className="text-body fs-6">Cámara de temple</span>
            <input type="text" className="form-control" placeholder="01" />
            <Button className="btn-secondary text-white mt-2">
              Añadir sensor
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={onHide}>
          Cancelar
        </Button>
        <Button className="btn-secondary text-white">Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OvenAdministrationEdit;
