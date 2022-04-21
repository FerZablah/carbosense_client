import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import translatePhase from "../phasesDisplay";

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

const MetallurgyReportAuthorization = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [report, setReport] = useState(null);
    const [reportValues, setReportValues] = useState({});
    const [observations, setObservations] = useState("");
    const [disposition, setDisposition] = useState(null);
    const [reportFilled, setReportFilled] = useState(false);
    const [analyzer, setAnalyzer] = useState(null);
    const [cycle, setCycle] = useState(null);
    const [vistoBueno, setVistoBueno] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const [authorizer, setAuthorizer] = useState(null);
    //get user from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    const getReport = useCallback(async () => {
        const res = await axios.get(
            `http://localhost:4000/metallurgy/${params.cycleId}`
        );
        const data = res.data.fields.filter(
            (section) =>
                !["Observaciones", "Disposición"].includes(section.section)
        );

        setReportFilled(res.data.id !== undefined);
        const registeredObservations = res.data.fields.find((section) =>
            section.fields.find((field) => field.name === "Observaciones")
        );
        if (
            registeredObservations &&
            registeredObservations.fields &&
            registeredObservations.fields.length > 0 &&
            registeredObservations.fields[0].real
        ) {
            setObservations(registeredObservations.fields[0].real.real);
        }
        if (
            res.data.disposition !== undefined &&
            res.data.disposition !== null
        ) {
            setDisposition(res.data.disposition);
        }
        if (res.data.analyzer !== undefined && res.data.analyzer !== null) {
            setAnalyzer(res.data.analyzer);
        }
        if (
            res.data.authorizer !== undefined &&
            res.data.authorizer !== null &&
            res.data.authorizer.id !== null
        ) {
            setAuthorized(true);
            setVistoBueno(true);
            setAuthorizer(res.data.authorizer);
        }
        setReport(data);
        setCycle(res.data.cycle);
    }, [params.cycleId]);
    useEffect(() => {
        getReport();
    }, [getReport]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportValues({ ...reportValues, [name]: value });
    };
    const handleSubmit = async () => {
        await axios.post(
            `http://localhost:4000/metallurgy/report/authorize/${params.cycleId}`,
            {
                authorizedBy: user.id,
            }
        );
        toast.success("Reporte guardado");
        getReport();
    };
    if (!cycle) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/metalurgica/autorizacion">
                    Autorización reportes metalúrgicos
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{cycle.id}</Breadcrumb.Item>
            </Breadcrumb>
            <Container>
                <Row>
                    <Col className="mt-3 fw-bold fs-3 text-center">
                        Reporte metálurgica del ciclo
                    </Col>
                </Row>
            </Container>
            <Container className="bg-extra m-3 p-4 w-50 rounded text-center mx-auto">
                <Row>
                    <Col className="fw-bold fs-5 text-body">ID Horno:{88}</Col>
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
                        {cycle.recipe ? cycle.recipe : "-"}
                    </Col>
                </Row>
                <Row className="mt-2 text-center">
                    <Col>{}</Col>
                    <Col>{}</Col>
                    <Col />
                </Row>
            </Container>
            <Container className="mx-auto p-4">
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
                <Row className="mt-4">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start  mb-3 "
                        md={4}
                    >
                        Observaciones
                    </Col>
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start"
                        md={12}
                    >
                        <textarea
                            onChange={(e) => setObservations(e.target.value)}
                            className="w-100"
                            disabled={reportFilled}
                            value={observations}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start mb-3 "
                        md={4}
                    >
                        Disposición
                    </Col>
                </Row>
                <Row className="">
                    <Col
                        className="d-flex justify-content-start align-items-center"
                        md={4}
                    >
                        <input
                            type="radio"
                            id="aceptado"
                            className="me-3 "
                            name="disposition"
                            onClick={() => setDisposition(true)}
                            defaultChecked={disposition === true}
                            disabled={reportFilled}
                        />
                        <label htmlFor="aceptado" className="fw-bold">
                            Aceptado
                        </label>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className="d-flex justify-content-start align-items-center"
                        md={4}
                    >
                        <input
                            type="radio"
                            id="rechazado"
                            name="disposition"
                            className="me-3"
                            defaultChecked={disposition === false}
                            onClick={() => setDisposition(false)}
                            disabled={reportFilled}
                        />
                        <label htmlFor="rechazado" className="fw-bold">
                            Rechazado
                        </label>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start mb-3 "
                        md={4}
                    >
                        Analizó: {reportFilled ? `${analyzer.name} - ${analyzer.payrollId}` : `${user.name} - ${user.payrollId}`}
                    </Col>
                </Row>
                {authorized && (
                    <Row className="mt-1">
                        <Col
                            className="fs-5 fw-bold d-flex justify-content-start"
                            md={4}
                        >
                            Autorizó: {authorizer.name} - {authorizer.payrollId}
                        </Col>
                    </Row>
                )}
                <Row className="mt-1">
                    <Col
                        className="fs-5 fw-bold d-flex justify-content-start align-items-center "
                        md={4}
                    >
                        Dar visto bueno:{" "}
                        <input
                            type="checkbox"
                            className="ms-2"
                            checked={vistoBueno}
                            disabled={authorized}
                            onChange={(e) => setVistoBueno(e.target.checked)}
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col className="d-flex justify-content-end" md={12}>
                        {!authorized && (
                            <Button
                                className="btn-secondary"
                                onClick={handleSubmit}
                                disabled={!vistoBueno}
                            >
                                Guardar reporte
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default MetallurgyReportAuthorization;
