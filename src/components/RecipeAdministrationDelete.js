import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Breadcrumb,
  BreadcrumbItem,
} from "react-bootstrap";
import UserModal from "./UserModal";
import UserCard from "./UserCard";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils";

const RecipeAdministrationDelete = ({
  show,
  onHide,
  recipe,
  title,
  submitText,
  onDeleteSubmit,
}) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro que quiere eliminar la receta <strong>{recipe}{" "}</strong>
        del sistema?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          className="btn-primary text-white"
          onClick={() => {
            onDeleteSubmit();
            onHide();
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeAdministrationDelete;
