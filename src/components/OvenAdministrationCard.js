import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { GoKebabVertical } from "react-icons/go";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";

const OvenAdministrationCard = ({oven, onEditClicked, onDeleteClicked}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      <Container className="bg-extra m-3 p-2 w-100 rounded text-center position-relative">
        <Row>
          <Col
            md={3}
            className="d-flex justify-content-center align-items-center"
          ></Col>
          <Col
            md={9}
            className="d-flex flex-column justify-content-start align-items-start"
          >
            <span className="text-start fs-5 mt-1">Número de horno: 88</span>
            <span className="text-start fs-5 mt-1">Alias: Horno principal</span>
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

export default OvenAdministrationCard;
