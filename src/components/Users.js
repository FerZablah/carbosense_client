import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Breadcrumb,
} from "react-bootstrap";
import UserModal from "./UserModal";
import UserCard from "./UserCard";

const Users = (props) => {
  const [showAddUser, setShowAddUser] = useState(false);
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Administración de usuarios</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <UserModal
          show={showAddUser}
          onHide={() => setShowAddUser(false)}
          //   onSubmit={createUser}
        />
        <Row>
          <Col className="mt-3 fw-bold fs-1 text-start">
            Administración de usuarios
          </Col>
          <Col className="col-4 d-flex align-items-center justify-content-end">
            <button
              onClick={() => setShowAddUser(true)}
              type="button"
              className="btn btn-secondary text-white "
            >
              Agregar usuario
            </button>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <UserCard/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Users;
