import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Breadcrumb,
} from "react-bootstrap";
import Select from "react-select";
import OvenCardRecipeSelection from "./OvenCardRecipeSelection";
import RecipeModal from "./RecipeModal";

const OvenSelectionOperator = (props) => {
    const [ovens, setOvens] = useState([]);

    const getOvens = useCallback(async () => {
        const res = await axios.get(`http://localhost:4000/oven`);
        setOvens(res.data);
        console.log(res.data);
    }, []);
    useEffect(() => {
        getOvens();
    }, [getOvens]);



    return (
        <div className="m-4">
            <Breadcrumb className="p-3">
                <Breadcrumb.Item active>Selección de recetas</Breadcrumb.Item>
            </Breadcrumb>

            <div>
                <Row>
                    <Col className="mt-3 fw-bold fs-1 text-start">
                        Selección de Recetas de Hornos
                    </Col>
                </Row>
            </div>
            <div className="w-100 rounded text-center m-4">
                <Row>
                    {ovens.map((oven) => {
                        return (
                            <Col md={3} key={oven.id}>
                                <OvenCardRecipeSelection oven={oven} />
                            </Col>
                        );
                    })}
                </Row>
            </div>
        </div>
    );
};

export default OvenSelectionOperator;
