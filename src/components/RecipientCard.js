import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  BsChatFill,
  BsEnvelopeFill,
  BsPencilFill,
  BsTrashFill,
  BsWhatsapp,
} from "react-icons/bs";
import axios from "axios";
import RecipientModal from "./RecipientModal";
import toast from "react-hot-toast";

const icons = {
    sms: <BsChatFill key="sms" size="20" className="ms-3" />,
    email: <BsEnvelopeFill key="email" size="20" className="ms-3" />,
    whatsapp: <BsWhatsapp key="whatsapp" size="20" className="ms-3" />,
  };

const RecipientCard = (props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  
    const [recipients, setRecipients] = useState([]);
    const [recipientToDelete, setRecipientToDelete] = useState(null);
    const [recipientToEdit, setRecipientToEdit] = useState(null);
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Container className="bg-extra w-100 rounded text-center mx-auto">
              {recipients.map((recipient) => (
                <Row key={recipient.id}>
                  <Col className="fs-6 text-center">{recipient.name}</Col>
                  <Col className="fs-6 text-center">
                    +{recipient.countryCode} {recipient.phone}
                  </Col>
                  <Col className="fs-6 text-center">{recipient.email}</Col>
                  <Col className="fs-6 text-center">
                    {recipient.mediums.map((medium) => icons[medium.name])}
                  </Col>
                  <Col className="fs-6 text-center">
                    <BsPencilFill
                      role="button"
                      size="20"
                      className="ms-3"
                      onClick={() => {
                        setRecipientToEdit(recipient);
                        setShowEditModal(true);
                      }}
                    />
                    <BsTrashFill
                      role="button"
                      size="20"
                      className="ms-3"
                      onClick={() => {
                        setRecipientToDelete(recipient);
                        setShowDeleteModal(true);
                      }}
                    />
                  </Col> 
                </Row>
              ))}
              {/* <Row className="text-center fs-4 fw-bold mt-1">Jorge Ramírez</Row>
              <Row className="text-center fs-6 mt-1">8181456276</Row>
              <Row className="text-center fs-6 mt-1">
                jorge.ramirez@sisamex.com
              </Row>
              <Row className="text-center fs-6 mt-1">Medios de contacto</Row> */}
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RecipientCard;
