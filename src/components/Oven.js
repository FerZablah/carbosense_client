import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { GoKebabVertical } from "react-icons/go";
import {
    BsChatFill,
    BsEnvelopeFill,
    BsPencilFill,
    BsTrashFill,
    BsWhatsapp,
} from "react-icons/bs";
import translateRole from "../userRolesDisplay";
const UserCard = ({ user, onEditClicked, onDeleteClicked }) => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div>
            <Container className="bg-extra m-3 p-2 w-100 rounded text-center position-relative">
                <Row>
                    <Col
                        md={3}
                        className="d-flex justify-content-center align-items-center"
                    >
                        {user.photo ? (
                            <img
                                src={user.photo}
                                alt="user"
                                className="rounded-circle bg-white"
                                width={70}
                                height={70}
                                style={{ objectFit: "cover" }}
                            />
                        ) : (
                            <FaUser
                                size="70"
                                className="rounded-circle bg-white p-2 "
                            />
                        )}
                    </Col>
                    <Col
                        md={9}
                        className="d-flex flex-column justify-content-start align-items-start"
                    >
                        <span className="text-center fs-4 fw-bold mt-1">
                            {user.name}
                        </span>
                        <span className="text-center fs-6 mt-1">
                            No.nómina: <strong>{user.payrollId}</strong>
                        </span>
                        <span className="text-center fs-6 mt-1">
                            {translateRole[user.role]}
                        </span>
                        <span className="text-center fs-6 mt-1">
                            {user.email ? user.email : "⠀"}
                        </span>
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
            </Container>
        </div>
    );
};

export default UserCard;
