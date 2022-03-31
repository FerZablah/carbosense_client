import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import translateRole from "../userRolesDisplay";

const UserProfile = (props) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false);
    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            //send to back as form data
            const formData = new FormData();
            formData.append("photo", file);
            formData.append("payrollId", user.payrollId);
            const res = await axios.put(
                "http://localhost:4000/user/picture/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            user.photo = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            //reload website
            window.location.reload();
        }
    };
    if (loading) {
        //return spinner centered
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                <Breadcrumb.Item active>Perfil</Breadcrumb.Item>
            </Breadcrumb>
            <div className="m-3">
                <h1 className="fw-bold">Perfil</h1>
                <div className="bg-extra p-4" style={{ width: 450 }}>
                    <Row>
                        <Col md={4} className="mt-2 text-center">
                            {user.photo ? (
                                <img
                                    src={user.photo}
                                    alt="perfil"
                                    height={120}
                                    width={120}
                                    style={{ objectFit: "cover" }}
                                    className="rounded-circle bg-white"
                                />
                            ) : (
                                <FaUser
                                    size="70"
                                    className="rounded-circle bg-white p-2 "
                                />
                            )}
                            <label
                                className="btn btn-secondary mt-2"
                                htmlFor="upload"
                            >
                                Editar Foto
                            </label>
                            <input
                                type="file"
                                id="upload"
                                className="d-none"
                                onChange={(e) => handleFile(e)}
                                accept="image/*"
                            />
                        </Col>
                        <Col md={8}>
                            <Container className="bg-extra w-100 rounded text-center mx-auto">
                                <Row className="text-start fs-4 fw-bold">
                                    {user.name}
                                </Row>
                                <Row className="text-start fs-6">
                                    No.nómina: {user.payrollId}
                                </Row>
                                <Row className="text-start fs-6 mt-1">
                                    {translateRole[user.role]}
                                </Row>
                                <Row className="text-start fs-6 mt-1">
                                    {user.email ? user.email : "⠀"}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row></Row>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
