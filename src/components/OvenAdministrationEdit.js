import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/bootstrap.css";
import Select from "react-select";

const OvenAdministrationEdit = ({ oven, show, onHide, title, onEditSubmit }) => {
  const [id, setId] = useState(0);
  const [alias, setAlias] = useState("");
  const [mainCameraSensors, setMainCameraSensors] = useState([]);
  const [oxygenSensors, setOxygenSensors] = useState([]);
  const [templeSensors, setTempleSensors] = useState([]);

  useEffect(() => {
    if (oven) {
      setId(oven.id);
      setAlias(oven.alias);
      setMainCameraSensors(oven.sensors.filter(sensor => sensor.type === "mainCamera").map(sensor => ({ ...sensor, id: String(sensor.id) })));
      setOxygenSensors(oven.sensors.filter(sensor => sensor.type === "oxygen").map(sensor => ({ ...sensor, id: String(sensor.id) })));
      setTempleSensors(oven.sensors.filter(sensor => sensor.type === "temple").map(sensor => ({ ...sensor, id: String(sensor.id) })));
    }
  }, [oven]);
  const resetFields = () => {
    setId(0);
    setAlias("");
    setMainCameraSensors([]);
    setOxygenSensors([]);
    setTempleSensors([]);
  };
  const handleSubmit = async () => {
    if (!id || id.length < 1) {
      toast.error("Debe ingresar un ID para el horno");
      return;
    }
    else if (!alias || alias.length < 1) {
      toast.error("Debe ingresar un alias para el horno");
      return;
    }
    else if (mainCameraSensors.length < 1) {
      toast.error("Debe ingresar al menos un sensor para la cámara principal");
      return;
    }
    else if (oxygenSensors.length < 1) {
      toast.error("Debe ingresar al menos un sensor para detectar oxígeno");
      return;
    }
    else if (templeSensors.length < 1) {
      toast.error("Debe ingresar al menos un sensor para la camára de temple");
      return;
    }
    const sensorsValid = (
      mainCameraSensors.every(sensor => sensor.id && sensor.id.length > 0) &&
      oxygenSensors.every(sensor => sensor.id && sensor.id.length > 0) &&
      templeSensors.every(sensor => sensor.id && sensor.id.length > 0)
    );

    if (!sensorsValid) {
      toast.error("Debe ingresar un ID para cada sensor");
      return;
    }
    const uniqueSensors = new Set([
      ...mainCameraSensors.map(sensor => sensor.id),
      ...oxygenSensors.map(sensor => sensor.id),
      ...templeSensors.map(sensor => sensor.id)
    ]);
    if (uniqueSensors.size !== mainCameraSensors.length + oxygenSensors.length + templeSensors.length) {
      toast.error("Los IDs de los sensores deben ser únicos");
      return;
    }
    const sensors = [];
    mainCameraSensors.forEach(sensor => {
      sensors.push({
        id: sensor.id,
        type: "mainCamera"
      });
    });
    oxygenSensors.forEach(sensor => {
      sensors.push({
        id: sensor.id,
        type: "oxygen"
      });
    });
    templeSensors.forEach(sensor => {
      sensors.push({
        id: sensor.id,
        type: "temple"
      });
    });

    try {
      await axios.put(
        "http://localhost:4000/oven",
        {
          id,
          alias,
          sensors
        }
      );
      toast.success("Horno actualizado correctamente");
      resetFields();
      onEditSubmit();
      onHide();
    }
    catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        toast.error("El horno con este ID ya existe");
      }
      else {
        toast.error("Error al actualizar el horno");
      }
    }
  }
  if (!oven) return null;
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
        <div className="p-2 w-100">
          <div>
            <span className="text-body fs-6">Número de horno</span>
            <input type="text" className="form-control" placeholder="01" value={id} onChange={(e) => setId(e.target.value)} />
          </div>
          <div className="mt-2">
            <span className="text-body fs-6 mt-2">Alias</span>
            <input
              type="text"
              className="form-control"
              placeholder="Horno principal"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
            />
          </div>
          <div>
            <span className="fs-4 fw-bold">Sensores</span>
          </div>
          <div>
            <p className="text-body fs-6 mb-0">Cámara principal</p>
            {
              mainCameraSensors.map((sensor, index) => (
                <div className="d-flex column mb-2" key={`main-${index}`}>
                  <input type="text" value={sensor.id ? sensor.id : ''} className="form-control" placeholder="Inserta el ID del sensor"
                    onChange={(e) => {
                      const newSensors = mainCameraSensors.map((s, i) => {
                        if (i === index) {
                          return { ...s, id: e.target.value };
                        }
                        return s;
                      });
                      setMainCameraSensors(newSensors);
                    }} />
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const newSensors = mainCameraSensors.filter((s, i) => i !== index);
                      setMainCameraSensors(newSensors);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            }
            <Button className="btn-secondary text-white mt-2" onClick={() => {
              setMainCameraSensors([...mainCameraSensors, { id: null }]);
            }}>
              Añadir sensor
            </Button>
          </div>
          <div className="mt-3">
            <p className="text-body fs-6 mb-0">Oxígeno</p>
            {
              oxygenSensors.map((sensor, index) => (
                <div className="d-flex column mb-2" key={`main-${index}`}>
                  <input type="text" value={sensor.id ? sensor.id : ''} className="form-control" placeholder="Inserta el ID del sensor"
                    onChange={(e) => {
                      const newSensors = oxygenSensors.map((s, i) => {
                        if (i === index) {
                          return { ...s, id: e.target.value };
                        }
                        return s;
                      });
                      setOxygenSensors(newSensors);
                    }} />
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const newSensors = oxygenSensors.filter((s, i) => i !== index);
                      setOxygenSensors(newSensors);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            }
            <Button className="btn-secondary text-white mt-2" onClick={() => {
              setOxygenSensors([...oxygenSensors, { id: null }]);
            }}>
              Añadir sensor
            </Button>
          </div>
          <div className="mt-3">
            <p className="text-body fs-6 mb-0">Cámara temple</p>
            {
              templeSensors.map((sensor, index) => (
                <div className="d-flex column mb-2" key={`main-${index}`}>
                  <input type="text" value={sensor.id ? sensor.id : ''} className="form-control" placeholder="Inserta el ID del sensor"
                    onChange={(e) => {
                      const newSensors = templeSensors.map((s, i) => {
                        if (i === index) {
                          return { ...s, id: e.target.value };
                        }
                        return s;
                      });
                      setTempleSensors(newSensors);
                    }} />
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      const newSensors = templeSensors.filter((s, i) => i !== index);
                      setTempleSensors(newSensors);
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            }
            <Button className="btn-secondary text-white mt-2" onClick={() => {
              setTempleSensors([...templeSensors, { id: null }]);
            }}>
              Añadir sensor
            </Button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="link" onClick={() => {
          resetFields();
          onHide();
        }}>
          Cancelar
        </Button>
        <Button className="btn-secondary text-white" onClick={handleSubmit}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OvenAdministrationEdit;
