import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import UserProfileCard from "./UserProfileCard";
import { useNavigate } from "react-router-dom";

const UserProfile = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate(`/usuarios`)}>
          Administración de usuarios
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Perfil</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Row>
          <Col md={4}>
            <UserProfileCard />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
