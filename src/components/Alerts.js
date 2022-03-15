import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { BsChatFill, BsEnvelopeFill, BsPencilFill, BsTrashFill, BsWhatsapp } from "react-icons/bs";
import axios from "axios";
import RecipientModal from "./RecipientModal";
import toast from "react-hot-toast";

const icons = {
  sms: <BsChatFill key='sms' size="20" className="ms-3" />,
  email: <BsEnvelopeFill key='email' size="20" className="ms-3" />,
  whatsapp: <BsWhatsapp key='whatsapp' size="20" className="ms-3" />,

}

const Alerts = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [recipients, setRecipients] = useState([]);
  const [recipientToDelete, setRecipientToDelete] = useState(null);
  const [recipientToEdit, setRecipientToEdit] = useState(null);


  const getRecipients = async () => {
    const res = await axios.get(`http://localhost:4000/alert/recipient`);
    setRecipients(res.data);
  };

  const deleteRecipient = async (id) => {
    await axios.delete(`http://localhost:4000/alert/recipient/${id}`);
    toast.success("Recipiente eliminado");
    getRecipients();
  }

  const createRecipient = async (recipient) => {
    await axios.post(`http://localhost:4000/alert/recipient`, {...recipient, mediums: Array.from(recipient.mediums)});
    toast.success("Recipiente agregado");
    getRecipients();
  }

  const updateRecipient = async (recipient) => {
    await axios.put(`http://localhost:4000/alert/recipient/${recipient.id}`, {...recipient, mediums: Array.from(recipient.mediums)});
    toast.success("Recipiente actualizado");
    getRecipients();
  }
  //Run on startup
  useEffect(() => {
    getRecipients();
  }, []);
  return (
    <Container>
      <RecipientModal show={showAddModal} onHide={() => setShowAddModal(false)} onSubmit={createRecipient} 
      />
      <RecipientModal show={showEditModal} onHide={() => setShowEditModal(false)} recipient={recipientToEdit} onSubmit={updateRecipient}/>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar recipiente</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estas seguro que quieres eliminar a <strong>{recipientToDelete && recipientToDelete.name}</strong> como recipiente de alertas? </Modal.Body>
        <Modal.Body>Al eliminarlo, este recipiente ya no recibira futuras alertas.</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" className="text-white" onClick={() => {
            deleteRecipient(recipientToDelete.id);
            setShowDeleteModal(false);
          }}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-5">
        <Col className="col-8 fw-bold fs-1 text-body">
          Recipiente de alertas
        </Col>
        <Col className="col-4 d-flex align-items-center justify-content-end" >
            <button
              onClick={() => setShowAddModal(true)}
              type="button"
              className="btn btn-primary text-white "
            >
              Agregar Recipiente
            </button>
        </Col>
      </Row>
      <Table striped bordered hover size="sm" className="mt-4">
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
          {
            recipients.map((recipient) => (
              <tr key={recipient.id}>
                <td className="fs-6 text-center">{recipient.name}</td>
                <td className="fs-6 text-center">+{recipient.countryCode} {recipient.phone}</td>
                <td className="fs-6 text-center">{recipient.email}</td>
                <td className="fs-6 text-center">{recipient.mediums.map(medium => icons[medium.name])}</td>
                <td className="fs-6 text-center">
                  <BsPencilFill role="button" size="20" className="ms-3" onClick={() => {
                    setRecipientToEdit(recipient);
                    setShowEditModal(true);
                  }} />
                  <BsTrashFill role="button" size="20" className="ms-3" onClick={() => {
                    setRecipientToDelete(recipient);
                    setShowDeleteModal(true);
                  }} />
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
};

export default Alerts;
