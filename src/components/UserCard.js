import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import perfil from "../perfil.jpg";
import { useNavigate } from "react-router-dom";

const UserCard = (props) => {
  const navigate = useNavigate();
  
  const clickHandler = () => {
    navigate("/perfil/");
  };
  return (
    <div>
      <Container
        onClick = {clickHandler}
        type="button"
        className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto"
      >
        <Row>
          <Col className="text-center mt-2">
            <span className="perfil">
              <img src={perfil} alt="perfil" height={120} class="rounded-circle"/>
            </span>
          </Col>
          <Col>
            <Container className="bg-extra w-100 rounded text-center mx-auto">
              <Row className="text-center fs-4 fw-bold mt-1">Jorge Ramírez</Row>
              <Row className="text-center fs-6 mt-1">No.nómina: 52148</Row>
              <Row className="text-center fs-6 mt-1">Administrador</Row>
              <Row className="text-center fs-6 mt-1">
                jorge.ramirez@sisamex.com
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserCard;
