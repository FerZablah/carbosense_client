import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import emailValidator from "email-validator";
import "react-phone-input-2/lib/bootstrap.css";
import es from "react-phone-input-2/lang/es.json";
import Select from "react-select";


const UserModal = ({ show, onHide, onSubmit, user }) => {
  const [name, setName] = useState("");
  const [payRoll, setPayRoll] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(new Set());
  const userTypes = [
    { value: "Administrador", label: "Administrador" },
    { value: "Operador", label: "Operador" },
    { value: "Calidad", label: "Calidad" },
    { value: "Técnico metalúrgico", label: "Técnico metalúrgico" },
  ];

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPayRoll(user.payRoll);
      setEmail(user.email);
      setUserType(user.userType);
    }
  }, [user]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className="m-2 p-3 w-full mx-auto rounded">
          <Row>
            <Col className="text-body fs-5">Nombre</Col>
          </Row>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
            </Col>
            <Row>
              <Col className="text-body fs-5">Número de nómina</Col>
            </Row>
            <Row>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  value={payRoll}
                  onChange={(e) => setPayRoll(e.target.value)}
                />
                <br></br>
              </Col>
              <Row>
                <Col className="text-body fs-5">Correo electrónico</Col>
              </Row>
              <Col>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
              </Col>
              <Row>
                <Col className="text-body fs-5">Tipo de usuario</Col>
              </Row>
              <Col>
                <div>
                  <Select
                    placeholder="Administrador"
                    options={userTypes}
                    // onChange={(newValue) => {
                    //   setSelectedOvens(newValue.map((item) => item.value));
                    // }}
                  />
                </div>
              </Col>
            </Row>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button class="text-white">Agregar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
