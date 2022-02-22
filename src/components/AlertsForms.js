import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AlertsForms = (props) => {
  const [enteredNameAlert, setEnteredNameAlert] = useState("");
  const [enteredPhoneAlert, setEnteredPhoneAlert] = useState("");
  const [enteredEmailAlert, setEnteredEmailAlert] = useState("");
  const [enteredComunicationAlert, setEnteredComunicationAlert] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredNameAlert(event.target.value);
  };

  const phoneChangeHandler = (event) => {
    setEnteredPhoneAlert(event.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmailAlert(event.target.value);
  };

  const comunicationChangeHandler = (event) => {
    setEnteredComunicationAlert(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const alertData = {
      nameAlert: enteredNameAlert,
      phoneAlert: enteredPhoneAlert,
      emailAlert: enteredEmailAlert,
      comunicationAlert: enteredComunicationAlert,
      id: Math.random(),
    };

    props.onSaveHornoData(alertData);
    setEnteredNameAlert("");
  };
  return (
    <div>
      <div className="w-100 p-2 bg-primary text-end text-white">@usuario</div>
      <Container
        onSubmit={submitHandler}
        className="bg-extra m-5 p-3 w-50 mx-auto rounded"
      >
        <Row>
          <Col className="text-body fw-bold fs-5">Agregar recipiente</Col>
        </Row>
        <br></br>
        <Row>
          <Col className="text-body fs-5">Nombre</Col>
        </Row>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              value={enteredNameAlert}
              onChange={nameChangeHandler}
            />
            <br></br>
          </Col>
          <Row>
            <Col className="text-body fs-5">Teléfono</Col>
          </Row>
          <Row>
            <Col>
              <PhoneInput
                country={"mx"}
                value={enteredPhoneAlert}
                onChange={phoneChangeHandler}
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
                value={enteredEmailAlert}
                onChange={emailChangeHandler}
              />
              <br></br>
            </Col>
            <Row>
              <Col className="text-body fs-5">Medios de contacto</Col>
            </Row>
            <Col>
              <input
                type="checkbox"
                value={enteredEmailAlert}
                onChange={comunicationChangeHandler}
              />{" "}
              Whatsapp
              <br></br>
              <input
                type="checkbox"
                value={enteredEmailAlert}
                onChange={comunicationChangeHandler}
              />{" "}
              SMS
              <br></br>
              <input
                type="checkbox"
                value={enteredEmailAlert}
                onChange={comunicationChangeHandler}
              />{" "}
              Correo electronico
              <br></br>
            </Col>
          </Row>
          <Col className="text-end">
            <button
              className="btn btn-danger text-white"
              type="button"
              onClick={props.onCancel}
            >
              Cancelar
            </button>
          </Col>
          <Col className="text-start">
            <button type="submit" className="btn btn-success text-white">
              Agregar
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AlertsForms;
