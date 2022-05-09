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
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const fieldTypeToHTML = {
  "string": "text",
  "number": "number",
}

const RecipeAdministrationEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [recipeId, setRecipeId] = useState("");
  const [piece, setPiece] = useState("");
  const [temperatureAlertMaxPercentage, setTemperatureAlertMaxPercentage] = useState("");
  const [temperatureAlertMinPercentage, setTemperatureAlertMinPercentage] = useState("");
  const [carbonAlertMaxPercentage, setCarbonAlertMaxPercentage] = useState("");
  const [carbonAlertMinPercentage, setCarbonAlertMinPercentage] = useState("");
  const [timeAlertMaxPercentage, setTimeAlertMaxPercentage] = useState("");
  const [timeAlertMinPercentage, setTimeAlertMinPercentage] = useState("");

  const [ovens, setOvens] = useState([]);
  const [selectedOvens, setSelectedOvens] = useState([]);
  const [metallurgyExpectedFields, setMetallurgyExpectedFields] = useState({});
  const [phases, setPhases] = useState({
    "heating": {
      time: '',
      temperature: '',
      oxygen: '',
    },
    "carburizado": {
      time: '',
      temperature: '',
      oxygen: '',
    },
    "difusion": {
      time: '',
      temperature: '',
      oxygen: '',
    },
    "ecualization": {
      time: '',
      temperature: '',
      oxygen: '',
    },
    "temple": {
      time: '',
      temperature: '',
      oxygen: '',
    },
  });
  const [metallurgyFields, setMetallurgyFields] = useState([]);

  const getMetallurgyFields = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/metallurgy/fields`);
      setMetallurgyFields(response.data);
    } catch (error) {
      toast.error('Error al obtener campos de reporte');
    }
  }, []);

  const getOvens = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/oven`);
      setOvens(response.data.map(oven => ({
        value: oven.id,
        label: `${oven.id} - ${oven.alias}`,
      })));
    } catch (error) {
      toast.error('Error al obtener hornos');
    }
  }, []);

  const getRecipe = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/recipe/${params.recipeId}`);
      setRecipeId(response.data.id);
      setPiece(response.data.piece);
      setSelectedOvens(response.data.ovens.map(oven => ({
        value: oven.id,
        label: `${oven.id} - ${oven.alias}`,
      })));
      const currentPhases = {};
      response.data.recipePhases.forEach(phase => {
        currentPhases[phase.name] = {
          time: phase.time,
          temperature: phase.temperature,
          oxygen: phase.oxygen,
        }
      });
      setPhases(currentPhases);
      setCarbonAlertMaxPercentage(response.data.carbonAlertMaxPercentage);
      setCarbonAlertMinPercentage(response.data.carbonAlertMinPercentage);
      setTemperatureAlertMaxPercentage(response.data.temperatureAlertMaxPercentage);
      setTemperatureAlertMinPercentage(response.data.temperatureAlertMinPercentage);
      setTimeAlertMaxPercentage(response.data.timeAlertMaxPercentage);
      setTimeAlertMinPercentage(response.data.timeAlertMinPercentage);

      //setAlertMaxPercentage(response.data.alertMaxPercentage);
      //setAlertMinPercentage(response.data.alertMinPercentage);
      const currentMetallurgyExpectedFields = {};
      response.data.metallurgyReportExpectedFields.forEach(field => {
        currentMetallurgyExpectedFields[field.fieldId] = field.expected;
      });
      setMetallurgyExpectedFields(currentMetallurgyExpectedFields);
    } catch (error) {
      console.log(error);
      toast.error('Error al obtener receta');
    }
  }, [params.recipeId]);


  useEffect(() => {
    getMetallurgyFields();
  }, [getMetallurgyFields]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  useEffect(() => {
    getOvens();
  }, [getOvens]);

  useEffect(() => {
    if (params.recipeId) {
      setRecipeId(params.recipeId);
    }
  }, [params.recipeId]);



  const submitRecipe = async () => {
    const phasesIsValid = Object.keys(phases).every(phase => Object.keys(phases[phase]).every(property => phases[phase][property] !== ""));
    const metallurgyFieldsIsValid = Object.keys(metallurgyFields).every(field => metallurgyFields[field] && metallurgyFields[field] !== "");
    if (!recipeId || recipeId.length < 1) {
      toast.error('Debe ingresar un ID para la receta');
      return;
    }
    else if (!piece || piece.length < 1) {
      toast.error('Debe ingresar una pieza para la receta');
      return;
    }
    else if (!selectedOvens || selectedOvens.length < 1) {
      toast.error('Debe seleccionar al menos un horno');
      return;
    }
    else if (!phasesIsValid) {
      toast.error('Debe ingresar todos los campos de la sección: Datos del ciclo');
      return;
    }
    else if (
      [
        temperatureAlertMaxPercentage,
        temperatureAlertMinPercentage,
        carbonAlertMaxPercentage,
        carbonAlertMinPercentage,
        timeAlertMaxPercentage,
        timeAlertMinPercentage
      ].some(value => isNaN(value))) {
      toast.error('Debe de ingresar un porcentaje de error válido para cada alerta');
      return;
    }
    else if (!metallurgyExpectedFields || !metallurgyFieldsIsValid || Object.keys(metallurgyExpectedFields).length < 14) {
      toast.error('Debe de ingresar todos los campos esperados del reporte de metalúrgica');
      return;
    }
    const parsedPhases = {};

    Object.keys(phases).forEach(phase => {
      parsedPhases[phase] = {
        ...phases[phase],
        temperature: Number(phases[phase].temperature),
        time: Number(phases[phase].time),
        oxygen: Number(phases[phase].oxygen),
      };
    });
    await axios.put(`${BASE_URL}/recipe`, {
      id: recipeId,
      piece,
      ovens: selectedOvens.map(oven => oven.value),
      recipePhases: parsedPhases,
      temperatureAlertMaxPercentage: Number(temperatureAlertMaxPercentage),
      temperatureAlertMinPercentage: Number(temperatureAlertMinPercentage),
      carbonAlertMaxPercentage: Number(carbonAlertMaxPercentage),
      carbonAlertMinPercentage: Number(carbonAlertMinPercentage),
      timeAlertMaxPercentage: Number(timeAlertMaxPercentage),
      timeAlertMinPercentage: Number(timeAlertMinPercentage),
      metallurgyReportFieldsExpected: metallurgyExpectedFields,
    });
    toast.success('Receta guardada con éxito');
  }

  const handleChange = (e, phase, property) => {
    const { value } = e.target;
    setPhases({
      ...phases,
      [phase]: {
        ...phases[phase],
        [property]: value,
      }
    })
  }

  const handleMetallurgyFieldChanged = (e, field) => {
    setMetallurgyExpectedFields({
      ...metallurgyExpectedFields,
      [field]: e.target.value,
    });
  }
  if (!phases) return null;
  return (
    <div>
      <Breadcrumb className="p-3">
        <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="/#/administracionRecetas">
          Administración de Recetas
        </Breadcrumb.Item>
        <Breadcrumb.Item active="/">Editar Receta {params.recipeId}</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Row>
          <Col className="fs-5 text-body" md={3} >
            ID Receta
            <input type="text" disabled value={recipeId} onChange={(e) => setRecipeId(e.target.value)} className="form-control" placeholder="01" />
          </Col>
        </Row>
        <Row>
          <Col className="fs-5 text-body mt-2" md={3} >
            No° de Pieza
            <input type="text" value={piece} onChange={(e) => setPiece(e.target.value)} className="form-control" placeholder="990" />
          </Col>
        </Row>
        <Row>
          <Col className="fs-5 text-body mt-2" md={4} >
            Hornos
            <Select
              placeholder="Seleccionar horno"
              options={ovens}
              isMulti
              onChange={(selected) => setSelectedOvens(selected)}
              value={selectedOvens}
            />
          </Col>
        </Row>
        <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
          <Row>
            <Col className="fs-3 fw-bold text-start">Datos del ciclo</Col>
          </Row>
          <Row>
            <Col className="fs-5 text-start mt-3">Etapa</Col>
            <Col className="fs-5 text-center mt-3">Tiempo esperado</Col>
            <Col className="fs-5 text-center mt-3">Temperatura esperada</Col>
            <Col className="fs-5 text-center mt-3">Porcentaje de oxígeno esperado</Col>
          </Row>
          <Row>
            <Col className="fs-6 text-start d-flex flex-row justify-content-start align-items-center">
              <p className="m-0 fw-bold">
                Calentamiento
              </p>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.heating.time}
                onChange={(e) => handleChange(e, "heating", "time")}
                min={0}
              />
              <span className="ms-2">minutos</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.heating.temperature}
                onChange={(e) => handleChange(e, "heating", "temperature")}
                min={0}
              />
              <span className="ms-2">ºC</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.heating.oxygen}
                onChange={(e) => handleChange(e, "heating", "oxygen")}
                min={0}
              />
              <span className="ms-2">%</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="fs-6 text-start d-flex flex-row justify-content-start align-items-center">
              <p className="m-0 fw-bold">
                Carburizado
              </p>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.carburizado.time}
                onChange={(e) => handleChange(e, "carburizado", "time")}
                min={0}
              />
              <span className="ms-2">minutos</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.carburizado.temperature}
                onChange={(e) => handleChange(e, "carburizado", "temperature")}
                min={0}
              />
              <span className="ms-2">ºC</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.carburizado.oxygen}
                onChange={(e) => handleChange(e, "carburizado", "oxygen")}
                min={0}
              />
              <span className="ms-2">%</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="fs-6 text-start d-flex flex-row justify-content-start align-items-center">
              <p className="m-0 fw-bold">
                Difusión
              </p>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.difusion.time}
                onChange={(e) => handleChange(e, "difusion", "time")}
                min={0}
              />
              <span className="ms-2">minutos</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.difusion.temperature}
                onChange={(e) => handleChange(e, "difusion", "temperature")}
                min={0}
              />
              <span className="ms-2">ºC</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.difusion.oxygen}
                onChange={(e) => handleChange(e, "difusion", "oxygen")}
                min={0}
              />
              <span className="ms-2">%</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="fs-6 text-start d-flex flex-row justify-content-start align-items-center">
              <p className="m-0 fw-bold">
                Ecualización
              </p>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.ecualization.time}
                onChange={(e) => handleChange(e, "ecualization", "time")}
                min={0}
              />
              <span className="ms-2">minutos</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.ecualization.temperature}
                onChange={(e) => handleChange(e, "ecualization", "temperature")}
                min={0}
              />
              <span className="ms-2">ºC</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.ecualization.oxygen}
                onChange={(e) => handleChange(e, "ecualization", "oxygen")}
                min={0}
              />
              <span className="ms-2">%</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="fs-6 text-start d-flex flex-row justify-content-start align-items-center">
              <p className="m-0 fw-bold">
                Temple
              </p>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.temple.time}
                onChange={(e) => handleChange(e, "temple", "time")}
                min={0}
              />
              <span className="ms-2">minutos</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.temple.temperature}
                onChange={(e) => handleChange(e, "temple", "temperature")}
                min={0}
              />
              <span className="ms-2">ºC</span>
            </Col>
            <Col className="d-flex flex-row justify-content-start align-items-center">
              <input
                type="number"
                className="form-control form-control-sm text-center"
                value={phases.temple.oxygen}
                onChange={(e) => handleChange(e, "temple", "oxygen")}
                min={0}
              />
              <span className="ms-2">%</span>
            </Col>
          </Row>

        </Container>
        <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
          <Row>
            <Col className="fs-3 fw-bold text-start">
              Límites para envío de alertas
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mt-3 d-flex align-items-center ms-2">
              <span>Porcentaje de error límite superior temperatura</span>
            </Col>
            <Col md={6} className="text-start mt-3 ms-2 d-flex align-items-center">
              <input
                type="number"
                max={100}
                min={0}
                className="text-start me-2 w-25"
                value={temperatureAlertMaxPercentage || ''}
                onChange={(e) => setTemperatureAlertMaxPercentage(e.target.value)}
              />{"  %"}

            </Col>
          </Row>
          <Row>
            <Col md={4} className="mt-3 d-flex align-items-center ms-2">
              <span>Porcentaje de error límite inferior temperatura</span>
            </Col>
            <Col md={6} className="text-start mt-3 ms-2 d-flex align-items-center">
              <input
                type="number"
                max={100}
                min={0}
                className="text-start me-2 w-25"
                value={temperatureAlertMinPercentage || ''}
                onChange={(e) => setTemperatureAlertMinPercentage(e.target.value)}
              />{"  %"}

            </Col>
          </Row>
          <Row>
            <Col md={4} className="mt-3 d-flex align-items-center ms-2">
              <span>Porcentaje de error límite superior carbono</span>
            </Col>
            <Col md={6} className="text-start mt-3 ms-2 d-flex align-items-center">
              <input
                type="number"
                max={100}
                min={0}
                className="text-start me-2 w-25"
                value={carbonAlertMaxPercentage || ''}
                onChange={(e) => setCarbonAlertMaxPercentage(e.target.value)}
              />{"  %"}

            </Col>
          </Row>
          <Row>
            <Col md={4} className="mt-3 d-flex align-items-center ms-2">
              <span>Porcentaje de error límite inferior carbono</span>
            </Col>
            <Col md={6} className="text-start mt-3 ms-2 d-flex align-items-center">
              <input
                type="number"
                max={100}
                min={0}
                className="text-start me-2 w-25"
                value={carbonAlertMinPercentage || ''}
                onChange={(e) => setCarbonAlertMinPercentage(e.target.value)}
              />{"  %"}

            </Col>
          </Row>
          <Row>
            <Col md={4} className="mt-3 d-flex align-items-center ms-2">
              <span>Porcentaje de error límite superior tiempo</span>
            </Col>
            <Col md={6} className="text-start mt-3 ms-2 d-flex align-items-center">
              <input
                type="number"
                max={100}
                min={0}
                className="text-start me-2 w-25"
                value={timeAlertMaxPercentage || ''}
                onChange={(e) => setTimeAlertMaxPercentage(e.target.value)}
              />{"  %"}

            </Col>
          </Row>
          <Row>
            <Col md={4} className="mt-3 d-flex align-items-center ms-2">
              <span>Porcentaje de error límite inferior tiempo</span>
            </Col>
            <Col md={6} className="text-start mt-3 ms-2 d-flex align-items-center">
              <input
                type="number"
                max={100}
                min={0}
                className="text-start me-2 w-25"
                value={timeAlertMinPercentage || ''}
                onChange={(e) => setTimeAlertMinPercentage(e.target.value)}
              />{"  %"}

            </Col>
          </Row>
        </Container>
        <Container className="bg-extra m-3 p-4 w-100 rounded text-center mx-auto">
          <Row>
            <Col className="fs-3 fw-bold text-start mb-4">
              Reporte de Metalúrgica
            </Col>
          </Row>
          {
            metallurgyFields.map((sectionObject) => (
              <div key={sectionObject.section}>
                <Row>
                  <Col className="fs-4 fw-bold text-start mb-2">
                    {sectionObject.section}
                  </Col>
                </Row>
                {
                  sectionObject.fields.map((fieldObject) => (
                    <Row key={fieldObject.id}>
                      <Col md={4} className="text-start">
                        <span className="fs-6 p-0">
                          {fieldObject.name}{" "}
                        </span>

                      </Col>
                      <Col md={3} className="text-start">
                        <input
                          type={'text'}
                          value={metallurgyExpectedFields[fieldObject.id] || ''}
                          className="text-end mt-1 ms-2"
                          onChange={(e) => handleMetallurgyFieldChanged(e, fieldObject.id)}
                        />{" "}
                        {fieldObject.unit}
                      </Col>
                    </Row>
                  ))
                }
              </div>
            ))
          }

          <Row className="justify-content-end">
            <Col md={2}>
              <Button className="btn-secondary text-white" onClick={submitRecipe}>
                Guardar Receta
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default RecipeAdministrationEdit;
