import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SystemSettings = () => {
    const navigate = useNavigate();
    const [sensorDataWaitTime, setSensorDataWaitTime] = useState(0);
    const [oxygenFactor, setOxygenFactor] = useState(0);

    const getSettings = useCallback(async () => {
        const data = await axios.get("http://localhost:4000/systemSetting");
        setSensorDataWaitTime(data.data.sensorDataWaitTime);
        setOxygenFactor(data.data.oxygenFactor);
    }, []);

    const handleSubmit = async () => {
        await axios.put("http://localhost:4000/systemSetting", {
            settings: [
                {
                    name: "sensorDataWaitTime",
                    value: sensorDataWaitTime,
                },
                {
                    name: "oxygenFactor",
                    value: oxygenFactor,
                }
            ]
        });
        toast.success("Configuración guardada");
        getSettings();
    }

    useEffect(() => {
        getSettings();
    }, [getSettings]);
    return (
        <div className="m-3">
            <Breadcrumb>
                <Breadcrumb.Item onClick={() => navigate(`/`)}>
                    Inicio
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Configuración del sistema</Breadcrumb.Item>
            </Breadcrumb>
            <span className="fw-bold fs-3 text-center">
                Configuración del sistema
            </span>
            <Row className="mb-4 pt-4">
                <Col
                    className="fs-6 d-flex justify-content-start"
                    md={3}
                >
                    Tiempo espera recolección de lecturas de sensores
                </Col>
                <Col
                    className="fs-6 d-flex justify-content-start"
                    md={3}
                >
                    <input
                        type={"number"}
                        value={sensorDataWaitTime}
                        className="w-25 me-3"
                        onChange={(e) => setSensorDataWaitTime(e.target.value)}
                    />
                    <span>segundos</span>
                </Col>
            </Row>
            <Row className="mb-4 pt-4">
                <Col
                    className="fs-6 d-flex justify-content-start"
                    md={3}
                >
                    Factor multiplicación voltaje/oxígeno
                </Col>
                <Col
                    className="fs-6 d-flex justify-content-start"
                    md={3}
                >
                    <input
                        type={"number"}
                        value={oxygenFactor}
                        className="w-25 me-3"
                        onChange={(e) => setOxygenFactor(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="d-flex offset-md-3 justify-content-start">
                    <Button
                        className="btn-secondary"
                        onClick={handleSubmit}
                    >
                        Guardar configuración
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default SystemSettings;
