import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Breadcrumb,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Select from "react-select";
import RecipeModal from "./RecipeModal";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils";

const renderInput = (type, name, onChange, reportFilled, realValue) => {
  if (reportFilled) {
    return <span>{realValue}</span>;
  }
  switch (type) {
    case "string":
      return (
        <input
          type="text"
          name={name}
          className="me-2"
          onChange={onChange}
        />
      );
    case "number":
      return (
        <input
          type="number"
          name={name}
          className="me-2"
          onChange={onChange}
        />
      );
    case "date":
      return (
        <input
          type="date"
          name={name}
          className="me-2"
          onChange={onChange}
        />
      );
    default:
      return (
        <input
          type="text"
          name={name}
          className="mx-2"
          onChange={onChange}
        />
      );
  }
};

const OvenAdministrationOperator = (props) => {
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [cycle, setCycle] = useState(null);
  const [report, setReport] = useState(null);
  const [reportValues, setReportValues] = useState(null);
  const [reportFilled, setReportFilled] = useState(false);
  const [pieces, setPieces] = useState([]);
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const getCurrentCycle = useCallback(async () => {
    const res = await axios.get(`${BASE_URL}/oven/currentCycle/${params.ovenId}`);

    setCycle(res.data);
    setSelectedRecipe(res.data.recipe);
  }, [params.ovenId]);

  const getReport = useCallback(async () => {
    if (!cycle) return;
    const res = await axios.get(`${BASE_URL}/metallurgy/operator/${cycle.id}`);
    setReportFilled(res.data.id !== undefined);
    setReport(res.data.fields);
  }, [cycle]);

  const getPieces = useCallback(async () => {
    if (!cycle) return;
    const res = await axios.get(`${BASE_URL}/recipe/piece/${params.ovenId}`);
    setPieces(res.data);
  }, [cycle, params.ovenId]);

  const submitRecipe = useCallback(async () => {
    if (!cycle) return;
    if (!selectedPiece) {
      toast.error("Debe seleccionar una pieza");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/recipe/piece/selection`,
        {
          piece: selectedPiece,
          ovenId: params.ovenId,
        }
      );
      setSelectedRecipe(res.data.id);
      toast.success("Pieza seleccionada, receta aplicada");
      getReport();
    } catch (error) {
      //if 404 error toast no recipe found
      if (error.response.status === 404) {
        toast.error("No se encontro una receta para la pieza y horno seleccionada");
      }
    }
  }, [cycle, params.ovenId, selectedPiece]);

  useEffect(() => {
    getReport();
  }, [getReport]);

  useEffect(() => {
    getCurrentCycle();
  }, [getCurrentCycle]);

  useEffect(() => {
    getPieces();
  }, [getPieces]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportValues({ ...reportValues, [name]: value });
  };

  const renderCurrentCycleData = () => {
    if (!cycle) return (
      <div className="text-center">
        <h3>No hay datos de ciclo actual</h3>
      </div>
    )
    return (
      <Container className="bg-extra m-3 p-4 w-50 rounded text-center mx-auto">
        <Row>
          <Col className="fw-bold fs-5 text-body">ID Horno:{params.ovenId}</Col>
        </Row>
        <Row className="mt-4 text-center">
          <Col className="fs-6">Inicio del ciclo</Col>
          <Col className="fs-6">Fin del ciclo</Col>
          <Col className="fs-6">Duración del ciclo</Col>
          <Col className="fs-6">Receta</Col>
        </Row>
        <Row className="mt-2 text-center">
          <Col className="fs-5 fw-bold">
            {moment(cycle.start).format("HH:mm:ss")}
          </Col>
          <Col className="fs-5 fw-bold">
            {" "}
            {cycle.end ? moment(cycle.end).format("HH:mm:ss") : "-"}
          </Col>
          <Col className="fs-5 fw-bold">
            {cycle.duration ? cycle.duration : "-"}
          </Col>
          <Col className="fs-5 fw-bold">
            {selectedRecipe ? selectedRecipe : "-"}
          </Col>
        </Row>
        <Row className="mt-2 text-center">
          <Col>{ }</Col>
          <Col>{ }</Col>
          <Col />
        </Row>
      </Container>
    )
  }

  const handleSubmit = async () => {
    if (!reportValues || Object.keys(reportValues).length < 2 || Object.keys(reportValues).some(key => reportValues[key] === "")) {
      //toast message
      toast.error("Debe ingresar todos los campos");
      return;
    }
    const fields = Object.keys(reportValues).map((key) => {
      return {
        id: key,
        real: reportValues[key],
      };
    });
    //axios put

    const res = await axios.put(
      `${BASE_URL}/metallurgy/report/operator/${cycle.id}`,
      {
        fields,
        operatedBy: user.id,
      }
    );
    toast.success("Reporte guardado");
    getReport();
  };
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Horno {params.ovenId}</Breadcrumb.Item>
      </Breadcrumb>
      <RecipeModal
        show={showConfirmModal}
        onSubmit={submitRecipe}
        selectedPiece={selectedPiece}
        oven={params.ovenId}
        onHide={() => setConfirmModal(false)}
      />
      {renderCurrentCycleData()}
      <div className="mx-auto p-4 w-75 rounded text-center">
        <Row>
          <Col className="fw-bold fs-3 text-start">
            Selección de Recetas de Hornos
          </Col>
        </Row>
        <Row className="w-100 bg-extra p-3">
          <Col md={2} className="text-center fs-6 fw-bold">
            Número de pieza:
          </Col>
          <Col>
            <div>
              <Select
                placeholder="Seleccionar número de pieza"
                options={pieces.map((piece) => {
                  return {
                    label: piece,
                    value: piece,
                  };
                })}
                onChange={(newValue) => {
                  setSelectedPiece(newValue.value);
                }}
              />
            </div>
          </Col>
          <Col md={2}>
            <button
              onClick={() => {
                if (!selectedPiece) {
                  toast.error("Debe seleccionar una pieza");
                  return;
                }
                else {
                  setConfirmModal(true);
                }

              }}
              type="button"
              className="btn btn-link fs-6 text-center"
            >
              Confirmar seleccion
            </button>
          </Col>
        </Row>

      </div>
      <div className="mx-auto p-4 w-75 rounded text-center">
        {report &&
          report.map((section) => (
            <div key={section.section} className="mt-3">
              <Row>
                <Col
                  className="fs-5 fw-bold d-flex justify-content-start"
                  md={4}
                >
                  {section.section}
                </Col>
              </Row>
              <Row className="mb-4">
                <Col
                  className="fs-5 fw-bold offset-md-4 d-flex justify-content-start"
                  md={4}
                >
                  Real
                </Col>
                <Col
                  className="fs-5 fw-bold d-flex justify-content-start"
                  md={4}
                >
                  Esperado
                </Col>
              </Row>
              {section.fields.map((field) => (
                <Row key={field.id} className="mt-3">
                  <Col
                    className="fs-6 d-flex justify-content-start"
                    md={4}
                  >
                    {field.name}
                  </Col>
                  <Col
                    md={4}
                    className="d-flex justify-content-start"
                  >
                    {renderInput(
                      field.fieldType,
                      field.id,
                      handleChange,
                      reportFilled,
                      field.real ? field.real.real : null
                    )}
                    <span>
                      {field.unit ? field.unit : ""}
                    </span>
                  </Col>
                  <Col
                    md={4}
                    className="d-flex justify-content-start"
                  >
                    <span>{field.expected.expected}</span>
                  </Col>
                </Row>
              ))}
            </div>

          ))}
        <Row className="mt-4 ">
          <Col className="d-flex justify-content-end" md={12}>
            {!reportFilled && (
              <Button
                className="btn-secondary"
                onClick={handleSubmit}
              >
                Guardar análisis químicos
              </Button>
            )}
          </Col>
        </Row>
      </div>

    </div>
  );
};

export default OvenAdministrationOperator;
