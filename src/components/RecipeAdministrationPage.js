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

const RecipeAdministrationPage = () => {
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="/#/administracionRecetas">
          Administración de Recetas
        </Breadcrumb.Item>
        <Breadcrumb.Item active="/">Agregar Receta</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Row>
          <Col className="fs-5 text-body" md={3} >
            Receta
            <input type="text" className="form-control" placeholder="01" />
          </Col>
        </Row>
        <Row>
          <Col className="fs-5 text-body mt-2" md={3} >
            No° de Pieza
            <input type="text" className="form-control"placeholder="990" />
          </Col>
        </Row>
        <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
          <Row>
            <Col className="fs-3 fw-bold text-center">Datos del ciclo</Col>
          </Row>
          <Row>
            <Col className="fs-5 text-start mt-3 ms-2">Etapa</Col>
            <Col className="fs-5 text-center mt-3">Tiempo</Col>
            <Col className="fs-5 text-center mt-3">Temperatura incial</Col>
            <Col className="fs-5 text-center mt-3">
              Porcentaje de Carbono inicial
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 fw-bold text-start mt-3 ms-2">
              Calentamiento
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 fw-bold text-start mt-3 ms-2">Carburizado</Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 fw-bold text-start mt-3 ms-2">Difusión</Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 fw-bold text-start mt-3 ms-2">
              Ecualización
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 fw-bold text-start mt-3 ms-2">Temple</Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control form-control-sm text-center"
                placeholder="990"
              />
            </Col>
          </Row>
        </Container>
        <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
          <Row>
            <Col className="fs-3 fw-bold text-center">
              Límites para envío de alertas
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-center mt-3 ms-2">
              Porcentaje de error máximo
              <input
                type="text"
                className="text-center mt-3 ms-2"
                placeholder="990"
              />{" "}
              %
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-center mt-3 ms-2">
              Porcentaje de error mínimo
              <input
                type="text"
                className="text-center mt-3 ms-2"
                placeholder="990"
              />{" "}
              %
            </Col>
          </Row>
        </Container>
        <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
          <Row>
            <Col className="fs-3 fw-bold text-center">
              Reporte de Metalúrgica
            </Col>
          </Row>
          <Row>
            <Col className="fs-4 fw-bold text-start mt-2 ms-2">
              Condiciones de horno
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Agitación (RPM’s){" "}
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
              RPM
            </Col>
          </Row>
          <Row>
            <Col className="fs-4 fw-bold text-start mt-5 ms-2">
              Capa carburizada
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Capa Efectiva Diámetro Paso{" "}
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
              "plg
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Capa Total Diámetro Paso{" "}
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
              "plg
            </Col>
          </Row>
          <Row>
            <Col className="fs-4 fw-bold text-start mt-5 ms-2">
              Microestructura
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Microestructura en Capa Carburizada{" "}
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Bainita en superficie
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Inicio de presencia de Bainita{" "}
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Austenita Retenida (%)
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
              %
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Oxidación Intergranular (plg)
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
              "
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Tamaño de Grano en Nucleo
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Tamaño de Grano en capa carburizada
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              Carburos{" "}
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-4 fw-bold text-start mt-5 ms-2">
              Análisis Químico
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              % Carbono superficial
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              % Carbono Laina Carburizado
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start mt-3 ms-2">
              % Carbono Laina Difusión
              <input
                type="text"
                className="text-center mt-1 ms-2"
                placeholder="-"
              />{" "}
            </Col>
          </Row>
          <Row>
            <Col>
              <Button className="btn-secondary text-white align-items-center justify-content-center">
                Guardar Receta
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default RecipeAdministrationPage;
