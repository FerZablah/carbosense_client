import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import perfil from "../perfil.jpg";

const UserProfileCard = (props) => {
  return (
    <div>
        <h1 class="fw-bold">Perfil</h1>
      <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
        <Row>
          <Col className="text-center mt-2">
            <span className="perfil">
              <img src={perfil} alt="perfil" height={120} class="rounded-circle"/>
            </span>
          </Col>
          <Col>
            <Container className="bg-extra w-100 rounded text-center mx-auto">
              <Row className="text-start fs-4 fw-bold">Jorge Ramírez</Row>
              <Row className="text-start fs-6">No.nómina: 52148</Row>
              <Row className="text-start fs-6 mt-1">Administrador</Row>
              <Row className="text-start fs-6 mt-1">
                jorge.ramirez@sisamex.com
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <button
            // onClick={}
            type="button"
            className="btn btn-secondary text-white mt-3 w-50 text-center mx-auto"
          >
            Editar Foto
          </button>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfileCard;
