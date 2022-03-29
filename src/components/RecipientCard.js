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
import { FaUser } from "react-icons/fa";
import { GoKebabVertical } from "react-icons/go";
import axios from "axios";
import RecipientModal from "./RecipientModal";
import toast from "react-hot-toast";

const icons = {
    sms: <BsChatFill key="sms" size="20" className="me-3" />,
    email: <BsEnvelopeFill key="email" size="20" className="me-3" />,
    whatsapp: <BsWhatsapp key="whatsapp" size="20" className="me-3" />,
};

const RecipientCard = ({ recipient, onEditClicked, onDeleteClicked }) => {
    const [showOptions, setShowOptions] = useState(false);
    return (
        <div
            className="w-100 p-3 mt-3 position-relative"
            style={{ backgroundColor: "#E9ECEF" }}
        >
            <Row>
                <Col
                    md={3}
                    className="d-flex justify-content-center align-items-center"
                >
                    <FaUser
                        size="70"
                        className="rounded-circle bg-white p-2 "
                    />
                </Col>
                <Col md={9}>
                    <h6>{recipient.name}</h6>
                    <p className="m-0">
                        +{recipient.countryCode} {recipient.phone}
                    </p>
                    <p className="m-0">{recipient.email}</p>
                    {recipient.mediums.map((medium) => icons[medium.name])}
                </Col>
            </Row>
            <GoKebabVertical
                className="position-absolute"
                style={{
                    top: "10",
                    right: "10",
                    cursor: "pointer",
                    userSelect: "none",
                }}
                onClick={() => setShowOptions(!showOptions)}
            />
            {showOptions && (
                <div
                    className="position-absolute w-25 p-2 bg-white"
                    style={{ top: 30, right: 10, cursor: "pointer" }}
                >
                    <div
                        className="bg-white flex d-flex justify-content-between"
                        onClick={() => {
                            setShowOptions(false);
                            onEditClicked();
                        }}
                    >
                        <span>Editar</span>
                        <BsPencilFill size="20" className="ms-2" />
                    </div>
                    <div
                        className="bg-white flex d-flex justify-content-between mt-2"
                        onClick={() => {
                            setShowOptions(false);
                            onDeleteClicked();
                        }}
                    >
                        <span>Eliminar</span>
                        <BsTrashFill size="20" className="ms-2" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipientCard;
