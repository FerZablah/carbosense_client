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
import { useNavigate } from "react-router-dom";
const OvenCardRecipeSelection = ({ oven }) => {
    const navigate = useNavigate();
    return (
        <div
            style={{ cursor: "pointer" }}
            className="oven-item"
            onClick={() => navigate(`/seleccion-recetas/${oven.id}`)}
        >
            <Container className="bg-extra m-3 p-2 w-100 rounded text-center position-relative">
                <p>
                    Número de horno: <span className="fw-bold">{oven.id}</span>
                </p>
                <p>
                    Alias: <span className="fw-bold">{oven.alias}</span>
                </p>
            </Container>
        </div>
    );
};

export default OvenCardRecipeSelection;
