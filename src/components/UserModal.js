import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import "react-phone-input-2/lib/bootstrap.css";
import Select from "react-select";
import emailValidator from "email-validator";

const userTypes = [
    { value: "admin", label: "Administrador" },
    { value: "oven_operator", label: "Operador" },
    { value: "qa", label: "Calidad" },
    { value: "metallurgy", label: "Técnico metalúrgico" },
];

const UserModal = ({ show, onHide, onSubmit, user, title, submitText }) => {
    const [name, setName] = useState("");
    const [payrollId, setPayRollId] = useState("");
    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [hasEmail, setHasEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    useEffect(() => {
        if (user) {
            setName(user.name);
            setPayRollId(user.payrollId);
            setEmail(user.email);
            setUserType(userTypes.find((type) => type.value === user.role));
            setHasEmail(user.email && user.email !== "");
            setPassword("");
        }
    }, [show, user]);
    const resetFields = () => {
        setName("");
        setPayRollId("");
        setEmail("");
        setUserType("");
        setHasEmail(false);
        setPassword("");
        setConfirmPassword("");
    };
    return (
        <Modal
            show={show}
            onHide={() => {
                resetFields();
                onHide();
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-2 w-full">
                    <div>
                        <span className="text-body fs-5">Nombre</span>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Francisco de León"
                        />
                    </div>
                    <div className="mt-2">
                        <span className="text-body fs-5 mt-2">
                            Número de nómina
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={payrollId}
                            onChange={(e) => setPayRollId(e.target.value)}
                            placeholder="123456"
                        />
                    </div>
                    <div className="mt-2">
                        <input
                            type="checkbox"
                            name="hasEmail"
                            checked={hasEmail}
                            onChange={(e) => setHasEmail(e.target.checked)}
                        />
                        <span className="text-body fs-5 mt-2 ms-2">
                            ¿Cuenta con correo electrónico?
                        </span>
                    </div>
                    <div className="mt-2">
                        {hasEmail ? (
                            <div>
                                <span className="text-body fs-5">
                                    Correo electrónico
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    name="email"
                                    placeholder="francisco.leon@sisamex.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div>
                                <span className="text-body fs-5">
                                    Contraseña
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    placeholder="********"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <span className="text-body fs-5">
                                    Confirmar contraseña
                                </span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={confirmPassword}
                                    placeholder="********"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <small>
                                    Recuerda que la contraseña es de al menos 6
                                    carácteres
                                </small>
                            </div>
                        )}
                    </div>
                    <div className="mt-2">
                        <span className="text-body fs-5">Tipo de usuario</span>
                        <Select
                            placeholder="Administrador"
                            options={userTypes}
                            value={userType}
                            onChange={(newValue) => setUserType(newValue)}
                        />
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="link" onClick={onHide}>
                    Cancelar
                </Button>
                <Button
                    className="btn-secondary text-white"
                    onClick={() => {
                        if (name.length < 3) {
                            toast.error(
                                "El nombre debe tener al menos 3 caracteres"
                            );
                            return;
                        } else if (payrollId.length < 6) {
                            toast.error("El número de nómina es muy corto");
                            return;
                        } else if (!hasEmail && password.length < 6) {
                            toast.error(
                                "La contraseña debe tener al menos 6 caracteres"
                            );
                            return;
                        } else if (password !== confirmPassword) {
                            toast.error("Las contraseñas no coinciden");
                            return;
                        } else if (
                            hasEmail &&
                            !emailValidator.validate(email)
                        ) {
                            toast.error("El correo electrónico no es válido");
                            return;
                        } else if (!userType) {
                            toast.error("El tipo de usuario es requerido");
                            return;
                        }
                        resetFields();
                        onSubmit({
                            name,
                            payrollId,
                            email,
                            role: userType.value,
                            password,
                            hasEmail,
                            confirmPassword,
                            originalPayrollId: user ? user.payrollId : null,
                        });

                        onHide();
                    }}
                >
                    {submitText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;
