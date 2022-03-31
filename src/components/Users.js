import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Breadcrumb,
} from "react-bootstrap";
import UserModal from "./UserModal";
import UserCard from "./UserCard";
import axios from "axios";
import toast from "react-hot-toast";
import UserModalDelete from "./UserModalDelete";

const Users = () => {
    const [showAddUser, setShowAddUser] = useState(false);
    const [users, setUsers] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [userToDelete, setUserToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);

    const getUsers = async () => {
        const res = await axios.get(`http://localhost:4000/user`);
        setUsers(res.data);
    };

    const createUser = async (user) => {
        await axios.post(`http://localhost:4000/user`, user);
        toast.success("Usuario agregado");
        getUsers();
    };
    const updateUser = async (user) => {
        await axios.put(
            `http://localhost:4000/user/${user.originalPayrollId}`,
            user
        );
        toast.success("Usuario actualizado");
        getUsers();
    };
    const deleteUser = async (user) => {
        console.log("delete user");
        await axios.delete(`http://localhost:4000/user/${user.id}`);
        toast.success("Usuario eliminado");
        getUsers();
    };

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div>
            <Breadcrumb className="p-3">
                <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                <Breadcrumb.Item active>
                    Administración de usuarios
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className="mx-4">
                <UserModal
                    show={showAddUser}
                    onHide={() => setShowAddUser(false)}
                    onSubmit={createUser}
                    title="Agregar usuario"
                    submitText="Agregar"
                />
                <UserModal
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    onSubmit={updateUser}
                    user={userToEdit}
                    title="Editar usuario"
                    submitText="Actualizar"
                />
                <UserModalDelete
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                    onSubmit={deleteUser}
                    user={userToDelete}
                    title="Eliminar usuario"
                />

                <Row>
                    <Col className="fw-bold fs-1 text-start">
                        Administración de usuarios
                    </Col>
                    <Col className="col-4 d-flex align-items-center justify-content-end">
                        <button
                            onClick={() => setShowAddUser(true)}
                            type="button"
                            className="btn btn-secondary text-white "
                        >
                            Agregar usuario
                        </button>
                    </Col>
                </Row>
                <Row>
                    {users.map((user) => (
                        <Col key={user.id} md={3}>
                            <UserCard
                                user={user}
                                onEditClicked={() => {
                                    setShowEditModal(true);
                                    setUserToEdit(user);
                                }}
                                onDeleteClicked={() => {
                                    setShowDeleteModal(true);
                                    setUserToDelete(user);
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Users;
