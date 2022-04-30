import React, { useCallback, useEffect, useState } from "react";
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
import { BASE_URL } from "../utils";

const OvenAdministration = () => {
  const [showAddOven, setShowAddOven] = useState(false);
  const [ovens, setOvens] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [ovenToEdit, setOvenToEdit] = useState(null);
  const [ovenToDelete, setOvenToDelete] = useState(null);

  const getOvens = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/oven`);
      setOvens(response.data);
    } catch (error) {
      toast.error("Error al obtener los hornos");
    }
  }, []);

  useEffect(() => {
    getOvens();
  }, [getOvens]);

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
          onCreateSubmit={() => {
            getOvens();
          }}
        />

        <OvenAdministrationEdit
          show={showEditModal}
          onHide={() => {
            setShowEditModal(false);
            setOvenToEdit(null);
          }}
          title="Actualizar horno"
          onEditSubmit={() => {
            getOvens();
          }}
          oven={ovenToEdit}
        />

        <OvenAdministrationDelete
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          title="Eliminar horno"
          oven={ovenToDelete}
          onDeleteSubmit={() => {
            getOvens();
          }}
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
          {ovens.map((oven) => (
            <Col md={3} key={oven.id}>
              <OvenAdministrationCard
                oven={oven}
                onEditClicked={() => {
                  setShowEditModal(true);
                  setOvenToEdit(oven);
                }}
                onDeleteClicked={() => {
                  setShowDeleteModal(true);
                  setOvenToDelete(oven);
                }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default OvenAdministration;
