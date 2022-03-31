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

const UserModalDelete = ({
    show,
    onHide,
    onSubmit,
    user,
    title,
    submitText,
}) => {
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
                ¿Estás seguro que quieres eliminar a{" "}
                <strong>{user && user.name}</strong> con número de nómina:{" "}
                <strong>{user && user.payrollId}</strong> como usuario del
                sistema?{" "}
            </Modal.Body>
            <Modal.Body>
                Al eliminarlo, este usuario ya no podrá acceder al sistema.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="link" onClick={onHide}>
                    Cancelar
                </Button>
                <Button
                    className="btn-primary text-white"
                    onClick={() => {
                        onSubmit(user);
                        onHide();
                    }}
                >
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserModalDelete;
