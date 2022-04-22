import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Breadcrumb,
  BreadcrumbItem,
} from "react-bootstrap";
import UserModal from "./UserModal";
import UserCard from "./UserCard";
import axios from "axios";
import toast from "react-hot-toast";
import OvenAdministrationDelete from "./OvenAdministrationDelete";
import OvenAdministrationModal from "./OvenAdministrationModal";
import OvenAdministrationCard from "./OvenAdministrationCard";
import OvenAdministrationEdit from "./OvenAdministrationEdit";

const OvenAdministration = () => {
  const [showAddOven, setShowAddOven] = useState(false);
  const [ovens, setOvens] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Administración de hornos</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mx-4">
        <OvenAdministrationModal
          show={showAddOven}
          onHide={() => setShowAddOven(false)}
          title="Agregar horno"
          submitText="Agregar"
        />

        <OvenAdministrationEdit
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          title="Actualizar horno"
        />

        <OvenAdministrationDelete
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          title="Eliminar horno"
        />
        <Row>
          <Col className=" ms-3 fw-bold fs-1 text-start">
            Administración de Hornos
          </Col>
          <Col className=" me-3 col-4 d-flex align-items-center justify-content-end">
            <button
              onClick={() => setShowAddOven(true)}
              type="button"
              className="btn btn-secondary text-white "
            >
              Agregar horno
            </button>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <OvenAdministrationCard
              oven = {ovens}
              onEditClicked={() => {
                setShowEditModal(true);
              }}
              onDeleteClicked={() => {
                setShowDeleteModal(true)
              }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OvenAdministration;
