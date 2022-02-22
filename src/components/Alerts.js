import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AlertForms from "./AlertsForms";
import Table from "react-bootstrap/Table";
import { BsChatFill, BsEnvelopeFill, BsPencilFill, BsTrashFill, BsWhatsapp, IconName } from "react-icons/bs";

const Alerts = (props) => {
  const [editando, setEditando] = useState(false);

  const saveAlert = (enteredAlert) => {
    const alertData = {
      ...enteredAlert,
    };
    props.onAddAlert(alertData);
    setEditando(false);
  };

  const startEditingHandler = () => {
    setEditando(true);
  };

  const stopEditingHandler = () => {
    setEditando(false);
  };

  if (!editando) {
    return (
      <div>
        <div className="w-100 p-2 bg-primary text-end text-white">@usuario</div>
        <Container>
          <Row>
            <Col className="w-75 p-3 fw-bold fs-1 text-start text-white rounded mt-3 text-body">
              Recipiente de alertas
            </Col>
            <Col></Col>
            <Col>
              <div className="w-100 text-end p-5">
                <button
                  onClick={startEditingHandler}
                  type="button"
                  className="btn btn-secondary "
                >
                  Agregar Recipiente
                </button>
              </div>
            </Col>
          </Row>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center fs-5">Nombre</th>
                <th className="text-center fs-5">Teléfono</th>
                <th className="text-center fs-5">Correo Electrónico</th>
                <th className="text-center fs-5">Medios de Contacto</th>
                <th className="text-center fs-5">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fs-6 text-center">Jorge Ramírez</td>
                <td className="fs-6 text-center">+52 (871) 158-1578</td>
                <td className="fs-6 text-center">jorge.ramirez@sisamex.com</td>
                <td className="fs-6 text-center"><BsChatFill size="30" className="ms-3" /><BsEnvelopeFill size="30"  className="ms-3"/><BsWhatsapp size="30"  className="ms-3"/></td>
                <td className="fs-6 text-center"><BsPencilFill size="30" className="ms-3"/><BsTrashFill size="30" className="ms-3"/></td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  } else {
    return <AlertForms saveAlert={saveAlert} onCancel={stopEditingHandler} />;
  }
};

export default Alerts;
