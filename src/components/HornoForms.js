import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./HornoForms.css";

const HornoForms = (props) => {
  const [enteredID, setEnteredID] = useState("");

  const idHornoChangeHandler = (event) => {
    setEnteredID(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const hornoData = {
      hornoID: enteredID,
      id: Math.random(),
    };

    props.onSaveHornoData(hornoData);
    setEnteredID('');
  };

  return (
    <Container onSubmit={submitHandler} className="bg-secondary m-5 p-3 w-50 mx-auto rounded">
      <Row>
        <Col className="text-white fs-4">
          Ingrese el ID del horno a agregar
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="number"
            min="0"
            className="form-control"
            value={enteredID}
            onChange={idHornoChangeHandler}
          />
        </Col>
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
            Agregar Horno
          </button>
        </Col>
      </Row>
    </Container>

  );
};

export default HornoForms;